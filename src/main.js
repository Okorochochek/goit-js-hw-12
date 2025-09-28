
import { getImgByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector('.load-more');

let query = "";
let page = 1;
const perPage = 15;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = form.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query",
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  

  try {
    const data = await getImgByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
    return;
    }

    createGallery(data.hits);

   const maxPage = Math.ceil(data.totalHits / perPage);
    if (page < maxPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

  } catch (error) {
    console.error("Error fetching images:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});


loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImgByQuery(query, page);
    createGallery(data.hits);

    const cardHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    const maxPage = Math.ceil(data.totalHits / perPage);
    if (page < maxPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
  } finally {
    hideLoader();
  }
});