import img from "./assets/images/icon-thank-you.svg";
import * as model from "./model";

class App {
  _mainContent = document.querySelector(".main__content");
  _mainButtons = document.querySelector(".main__buttons");
  _options = document.querySelectorAll(".options__option");
  _items = Array.from(document.querySelectorAll(".main__content--item"));
  _nextItem = document.querySelector(".button-next");
  _prevItem = document.querySelector(".button-back");
  _confirm = document.querySelector(".button-confirm");
  _asideSteps = document.querySelectorAll(".aside__step");
  _formName = document.querySelector(".personal__form--input-name");
  _formEmail = document.querySelector(".personal__form--input-email");
  _formNumber = document.querySelector(".personal__form--input-number");
  _optionsContainer = document.querySelector(".options__container");
  _planToggle = document.querySelector(".options__plan--toggle");
  _yearly = document.querySelector(".options__plan--yearly");
  _monthly = document.querySelector(".options__plan--monthly");
  _arcadePrice = document.querySelector(".arcade-price");
  _proPrice = document.querySelector(".pro-price");
  _advancedPrice = document.querySelector(".advanced-price");
  _addonsContainer = document.querySelector(".add-ons__container");
  _addons = document.querySelectorAll(".add-on");

  constructor() {
    console.log("aa");
    this._initialPosition();
    this._renderButtons(model.state.curPage);
    this._nextItem.addEventListener("click", this._nextPage.bind(this));
    this._prevItem.addEventListener("click", this._prevPage.bind(this));
    this._optionsContainer.addEventListener(
      "click",
      this._toggleOption.bind(this)
    );
    this._planToggle.addEventListener("click", this._togglePlanType.bind(this));
    this._addonsContainer.addEventListener(
      "click",
      this._toggleAddons.bind(this)
    );
    this._confirm.addEventListener("click", this._renderLastPage.bind(this));
  }

  _toggleAddons(e) {
    const curAddon = e.target.closest(".add-on");
    if (!curAddon) return;
    curAddon.classList.toggle("add-on--active");
  }

  _clear() {
    this._mainContent.innerHTML = "";
    this._mainButtons.style.display = "none";
  }

  _renderLastPage() {
    const markup = `
        <div class="thank-you">
          <div class="thank-you__container">
            <img
              src="${img}"
              alt="Icon thank you"
              class="thank-you__img"
            />
            <h1 class="heading-main">Thank you!</h1>
            <p class="paragraph">
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at support@loremgaming.com.
            </p>
          </div>
        </div>
    `;

    this._clear();
    this._mainContent.insertAdjacentHTML("afterbegin", markup);
  }

  _toggleAside(page) {
    const buttonNum = page + 1;
    if (buttonNum > 4) return;

    this._asideSteps.forEach((step) =>
      step.classList.remove("aside__step--active")
    );

    document
      .querySelector(`.aside__step--${buttonNum}`)
      .classList.add("aside__step--active");
  }

  _updateStateForm(page) {
    if (page === 0) {
      model.state.form.name = this._formName.value;
      model.state.form.email = this._formEmail.value;
      model.state.form.number = this._formNumber.value;
    }

    if (page === 1) {
      model.state.plan.name = document
        .querySelector(".options__option--active")
        .querySelector("h3").textContent;
      model.state.plan.price = document
        .querySelector(".options__option--active")
        .querySelector(".options__option--paragraph").textContent;
    }

    if (page === 2) {
      const activeAddons = Array.from(
        document.querySelectorAll(".add-on--active")
      );

      model.state.addons = [];

      activeAddons.forEach((addon) => {
        const addonName = addon.querySelector(".add-on__heading").textContent;
        const addonPrice = addon.querySelector(".add-on__price").textContent;
        model.state.addons.push({ name: addonName, price: addonPrice });
      });
    }
  }

  _renderButtons(page) {
    if (page === 0) {
      this._prevItem.classList.add("hidden");
    }

    if (page > 0 && page < 4) {
      this._prevItem.classList.remove("hidden");
    }
  }

  _initialPosition() {
    this._items.forEach((item, i) => {
      item.style.transform = `translateX(${i * 100}%)`;
      item.setAttribute("data-item", i + 1);
    });
  }

  _toggleOption(e) {
    const option = e.target.closest(".options__option");

    this._options.forEach((option) =>
      option.classList.remove("options__option--active")
    );
    option.classList.add("options__option--active");
  }

  _toggleActiveOption() {
    this._yearly.classList.toggle("options__plan--active");
    this._monthly.classList.toggle("options__plan--active");
  }

  _togglePlanType(e) {
    if (model.state.plan.type === "monthly") {
      model.state.plan.type = "yearly";
    } else {
      model.state.plan.type = "monthly";
    }

    if (model.state.plan.type === "yearly") {
      this._options.forEach((option) => {
        option
          .querySelector(".options__option--yearly")
          .classList.remove("hidden");
      });

      this._toggleActiveOption();
      this._planToggle.classList.add("options__plan--toggle-yearly");
      this._arcadePrice.textContent = "$90/mo";
      this._advancedPrice.textContent = "$120/mo";
      this._proPrice.textContent = "$150/mo";
    } else {
      this._options.forEach((option) => {
        option
          .querySelector(".options__option--yearly")
          .classList.add("hidden");
      });
      this._toggleActiveOption();
      this._planToggle.classList.remove("options__plan--toggle-yearly");
      this._arcadePrice.textContent = "$9/mo";
      this._advancedPrice.textContent = "$12/mo";
      this._proPrice.textContent = "$15/mo";
    }
  }

  _goToPage(page = 2) {
    this._items.forEach((item, i) => {
      item.style.transform = `translateX(${(i - page) * 100}%)`;
    });
  }

  _renderFinishingUp() {
    const markup = `
        <div class="main__content--item finishing-up">
          <h1 class="heading-main">Finishing up</h1>
          <p class="paragraph">
            Double-check everything looks OK before confirming
          </p>
          <div class="finishing-up__container">
            <div class="finishing-up__details">
              <div class="finishing-up__info">
                <div class="finishing-up__info--type-container">
                  <h3 class="finishing-up__heading">
                    <span class="finishing-up__type">${
                      model.state.plan.name
                    }</span>
                    <span class="finishing-up__plan">(${
                      model.state.plan.type
                    })</span>
                  </h3>

                  <a href="#" class="finishing-up__link">Change</a>
                </div>

                <span class="finishing-up__price">${
                  model.state.plan.price
                }</span>
              </div>

              <div class="finishing-up__additional">

              ${model.state.addons
                .map((addon) => {
                  return `
                    <p class="finishing-up__additional-paragraph">${addon.name}</p>
                    <span class="finishing-up__additional-price">${addon.price}</span>
                `;
                })
                .join("")}
              </div>
            </div>
            <div class="finishing-up__total">
              Total (per month) <span>$${this._countTotal()}/mo</span>
            </div>
          </div>
        </div>
    `;

    this._countTotal();
    document.querySelector(".finishing-up").innerHTML = "";
    document
      .querySelector(".finishing-up")
      .insertAdjacentHTML("afterbegin", markup);

    const finishingLink = document.querySelector(".finishing-up__link");

    finishingLink.addEventListener("click", function () {
      Array.from(document.querySelectorAll(".main__content--item")).forEach(
        (item, i) => {
          item.style.transform = `translateX(${(i - 1) * 100}%)`;
        }
      );

      model.state.curPage = 1;
    });

    document.querySelector(".button-next").style.display = "none";
    document.querySelector(".button-confirm").style.display = "block";
  }

  _countTotal() {
    const total =
      model.state.addons
        .map((addon) => {
          return +addon.price.match(/(\d+)/)[0];
        })
        .reduce((acc, mov) => {
          return acc + mov;
        }, 0) + +model.state.plan.price.match(/(\d+)/)[0];

    return total;
  }

  _nextPage() {
    if (model.state.curPage < 3) {
      model.state.curPage === 0 && this._updateStateForm(model.state.curPage);
      model.state.curPage === 1 && this._updateStateForm(model.state.curPage);
      if (model.state.curPage === 2) {
        this._updateStateForm(model.state.curPage);
        this._renderFinishingUp();
      }

      model.state.curPage++;

      this._renderButtons(model.state.curPage);
      this._goToPage(model.state.curPage);
      this._toggleAside(model.state.curPage);
    } else {
      this._renderLastPage();
    }
  }

  _prevPage() {
    if (model.state.curPage > 0) {
      if (model.state.curPage === 3) {
        document.querySelector(".button-next").style.display = "block";
        document.querySelector(".button-confirm").style.display = "none";
      }

      model.state.curPage--;
      this._renderButtons(model.state.curPage);
      this._goToPage(model.state.curPage);
      this._toggleAside(model.state.curPage);
    }
  }
}

const app = new App();
