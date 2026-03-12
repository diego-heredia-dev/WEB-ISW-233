import { initMockDB } from "./services/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const [template, list, observerElement] = document.querySelectorAll(
    "#card_template, #list, #bottom-observer",
  );

  const db = initMockDB({
    title: "Fundamentals of Frontend System Design",
    body: "Learning to use Intersection Observer",
  });

  function createCardElement(title, body) {
    const template = document.getElementById("card-template");
    const element = template.content.cloneNode(true).firstElementChild;
    const title_ = element.querySelector(".card__title");
    const body_ = element.querySelector(".card__body__content");

    title_.textContent = title;
    body_.textContent = body;
    return element;
  }

  const observer = new IntersectionObserver((entry) => {
    if(entry.isIntersecting) {
      const fragment = document.createDocumentFragment();
      fragment.appendChild(db.next());
      
    }
  })

  /**
   * Exercise - Intersection Observer
   * 1. Create Intersection observer instance and provide a callback to it
   * 2. In the callback use mock db - next function to get the next chunk of data
   * 3. Create a fragment where you chunk all your DOM Mutations
   * 4. Update fragment
   * 5. Append fragment to "list" container
   */
});
