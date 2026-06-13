import '../scss/style.scss'


import * as bootstrap from 'bootstrap';
const header = document.getElementById("topHeader");
const nav = document.getElementById("mainNav");
const homeSection = document.querySelector(".home");

let navbarShown = false;

window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY <= 50) {
        header.classList.remove("hide-header");
        nav.classList.remove("hide-nav", "sticky-nav");
        navbarShown = false;
    }
    else if (scrollY < homeBottom) {
        header.classList.add("hide-header");
        nav.classList.add("hide-nav");
        nav.classList.remove("sticky-nav");
        navbarShown = false;
    }
    else {
        header.classList.add("hide-header");

        nav.classList.remove("hide-nav");

        if (!navbarShown) {
            nav.classList.add("sticky-nav");
            navbarShown = true;
        }
    }
});
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        let parent = this.parentElement;
        let dropdown = parent.querySelector('.dropdown-menu-custom');
        let plus = this.querySelector('.plus');

        if (!dropdown) return;

        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            if (plus) plus.textContent = "+";
        } else {
            dropdown.style.display = "block";
            if (plus) plus.textContent = "-";
        }
    });
});

// ===========================
// PRODUCT SLIDER (Swiper)
// ===========================

if (typeof Swiper !== 'undefined') {

    // ✅ Hero Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        speed: 800,
        autoplay: false,

        navigation: {
            nextEl: '.hero-swiper .swiper-button-next',
            prevEl: '.hero-swiper .swiper-button-prev',
        },

        pagination: {
            el: '.hero-swiper .swiper-pagination',
            clickable: true
        },

        observer: true,
        observeParents: true
    });


    //  Products Carousel
    const productSwiper = new Swiper('.products-swiper', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,

        autoplay: false,

        navigation: {
            nextEl: '.products-swiper .swiper-button-next',
            prevEl: '.products-swiper .swiper-button-prev',
        },

        pagination: {
            el: '.products-swiper .swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 2,

                spaceBetween: 10
            },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
        }
    });


    //  News Carousel
    var swiper = new Swiper(".news-swiper", {
        loop: true,
        autoplay: false,

        slidesPerView: 3,
        spaceBetween: 20,

        navigation: {
            nextEl: ".news-swiper .swiper-button-next",
            prevEl: ".news-swiper .swiper-button-prev",
        },

        pagination: {
            el: ".news-swiper .swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            }
        }
    });

}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        var myModal = new bootstrap.Modal(document.getElementById('cartModal'));
        myModal.show();
    });
});

document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        var myModal = new bootstrap.Modal(document.getElementById('WishlistModal'));
        myModal.show();
    });
});

document.querySelectorAll('.Search-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        var myModal = new bootstrap.Modal(document.getElementById('SearchModal'));
        myModal.show();
    });
});


const scrollBtn = document.getElementById("scrollTopBtn");


window.addEventListener("scroll", () => {
    const homeHeight = homeSection.offsetHeight;

    if (window.scrollY > homeHeight) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const submenu = this.nextElementSibling;
        const plus = this.querySelector(".plus");

        if (submenu) {
            submenu.classList.toggle("show");
            plus.classList.toggle("active");
        }
    });
});

function toggleView(showRow, hideRow, activeBtn, inactiveBtn) {
    document.getElementById(showRow).classList.remove("d-none");
    document.getElementById(hideRow).classList.add("d-none");

    document.getElementById(activeBtn).classList.add("bg-primary", "text-white");
    document.getElementById(inactiveBtn).classList.remove("bg-primary", "text-white");
}
window.addEventListener("DOMContentLoaded", function () {
    if (
        document.getElementById("productRow") &&
        document.getElementById("listRow") &&
        document.getElementById("gridBtn") &&
        document.getElementById("listBtn")
    ) {
        toggleView("productRow", "listRow", "gridBtn", "listBtn");
    }
});

const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

if (gridBtn) {
    gridBtn.addEventListener("click", function () {
        toggleView("productRow", "listRow", "gridBtn", "listBtn");
    });
}

if (listBtn) {
    listBtn.addEventListener("click", function () {
        toggleView("listRow", "productRow", "listBtn", "gridBtn");
    });
}

let thumbSwiper = new Swiper(".product-thumb-slider", {
    direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 10,
});

const mainImage = document.getElementById("mainImage");
const wrapper = document.querySelector(".product-thumb-slider .swiper-wrapper");

function bindClicks() {
    document.querySelectorAll(".thumb-slide").forEach(slide => {

        slide.onclick = function () {

            const img = this.querySelector("img");
            mainImage.src = img.src;

            const slides = Array.from(wrapper.children);
            const index = slides.indexOf(this);

            const reordered = [
                ...slides.slice(index),
                ...slides.slice(0, index)
            ];

            thumbSwiper.destroy(true, true);

            wrapper.innerHTML = "";
            reordered.forEach(item => wrapper.appendChild(item));

            thumbSwiper = new Swiper(".product-thumb-slider", {
                direction: "vertical",
                slidesPerView: 4,
                spaceBetween: 10,
            });

            bindClicks();
        };
    });
}

bindClicks();


document.addEventListener("DOMContentLoaded", function () {
    const loginToggle = document.getElementById("loginToggle");
    const loginBox = document.getElementById("loginBox");

    if (loginToggle && loginBox) {
        loginToggle.addEventListener("click", function (e) {
            e.preventDefault();
            loginBox.classList.toggle("d-none");
        });
    }

    const CodeToggle = document.getElementById("CodeToggle");
    const CodeBox = document.getElementById("CodeBox");

    if (CodeToggle && CodeBox) {
        CodeToggle.addEventListener("click", function (e) {
            e.preventDefault();
            CodeBox.classList.toggle("d-none");
        });
    }




    const sections = ["discription", "reviews", "shipping"];
    const buttons = ["discriptionbtn", "reviewbtn", "shippingbtn"];

    function showSection(id, btnId) {

        sections.forEach(sec => {
            const el = document.getElementById(sec);
            if (el) el.classList.add("d-none");
        });

        const active = document.getElementById(id);
        if (active) active.classList.remove("d-none");

        buttons.forEach(btn => {
            const b = document.getElementById(btn);
            if (b) b.classList.remove("bg-primary");
        });

        const activeBtn = document.getElementById(btnId);
        if (activeBtn) activeBtn.classList.add("bg-primary");
    }


    const descBtn = document.getElementById("discriptionbtn");
    const reviewBtn = document.getElementById("reviewbtn");
    const shipBtn = document.getElementById("shippingbtn");

    if (descBtn) {
        descBtn.addEventListener("click", () => showSection("discription", "discriptionbtn"));
    }

    if (reviewBtn) {
        reviewBtn.addEventListener("click", () => showSection("reviews", "reviewbtn"));
    }

    if (shipBtn) {
        shipBtn.addEventListener("click", () => showSection("shipping", "shippingbtn"));
    }
    const header = document.querySelector(".select-header");
    const dropdown = document.querySelector(".select-dropdown");
    const options = document.querySelectorAll(".option");
    const selectedText = document.getElementById("selectedText");


    if (header && dropdown) {
        header.addEventListener("click", () => {
            dropdown.classList.toggle("d-none");
        });
    }


    options.forEach(option => {
        option.addEventListener("click", () => {
            selectedText.innerText = option.innerText;
            dropdown.classList.add("d-none");
        });
    });

});

const tabs = [
    {
        btn: document.getElementById("dashboardBtn"),
        content: document.getElementById("dashboard")
    },
    {
        btn: document.getElementById("ordersBtn"),
        content: document.getElementById("orders")
    },
    {
        btn: document.getElementById("downloadsBtn"),
        content: document.getElementById("downloads")
    },
    {
        btn: document.getElementById("addressBtn"),
        content: document.getElementById("address")
    },
    {
        btn: document.getElementById("accountBtn"),
        content: document.getElementById("account")
    }
];

tabs.forEach(tab => {

    if (!tab.btn || !tab.content) return;

    tab.btn.addEventListener("click", () => {

        tabs.forEach(item => {
            if (item.content) item.content.classList.add("d-none");
            if (item.btn) item.btn.classList.remove("active");
        });

        tab.content.classList.remove("d-none");
        tab.btn.classList.add("active");
    });

});

const dashBtn = document.getElementById("dashboardBtn");
if (dashBtn) dashBtn.click();

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // COMMON
    // =========================

    const patterns = {
        name: /^[A-Za-z\s]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        url: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/
    };

    function showError(id, msg) {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    }

    function clearErrors(form) {
        form.querySelectorAll(".error").forEach(e => e.textContent = "");
    }

    function validateField(value, errorId, rules) {
        if (!value) {
            showError(errorId, rules.required);
            return false;
        }
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(errorId, rules.invalid);
            return false;
        }
        return true;
    }

    function validateCheckbox(checked, errorId, msg) {
        if (!checked) {
            showError(errorId, msg);
            return false;
        }
        return true;
    }

    // =====================================================
    // 🔹 COMMENT FORM
    // =====================================================

    const commentForm = document.getElementById("myForm");

    if (commentForm) {
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            clearErrors(commentForm);
            let isValid = true;

            isValid &= validateField(
                document.getElementById("comment").value.trim(),
                "commentError",
                { required: "Comment is required" }
            );

            isValid &= validateField(
                document.getElementById("name").value.trim(),
                "nameError",
                {
                    required: "Name is required",
                    pattern: patterns.name,
                    invalid: "Only letters, min 3 characters"
                }
            );

            isValid &= validateField(
                document.getElementById("email").value.trim(),
                "emailError",
                {
                    required: "Email is required",
                    pattern: patterns.email,
                    invalid: "Enter valid email"
                }
            );

            isValid &= validateField(
                document.getElementById("website").value.trim(),
                "websiteError",
                {
                    required: "Website is required",
                    pattern: patterns.url,
                    invalid: "Enter valid URL"
                }
            );

            isValid &= validateCheckbox(
                document.querySelector("#myForm input[type='checkbox']").checked,
                "checkboxError",
                "Please check the box"
            );

            if (isValid) {
                alert("Comment submitted");
                commentForm.reset();
                clearErrors(commentForm);
            }
        });
    }

    // =====================================================
    //  SIGNUP FORM
    // =====================================================

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            clearErrors(signupForm);
            let isValid = true;

            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            isValid &= validateField(
                document.getElementById("firstName").value.trim(),
                "firstNameError",
                {
                    required: "First name required",
                    pattern: patterns.name,
                    invalid: "Only letters, min 3"
                }
            );

            isValid &= validateField(
                document.getElementById("lastName").value.trim(),
                "lastNameError",
                {
                    required: "Last name required",
                    pattern: patterns.name,
                    invalid: "Only letters, min 3"
                }
            );

            isValid &= validateField(
                document.getElementById("regEmail").value.trim(),
                "regEmailError",
                {
                    required: "Email required",
                    pattern: patterns.email,
                    invalid: "Invalid email"
                }
            );

            // PASSWORD
            if (!password) {
                showError("passwordError", "Password required");
                isValid = false;
            } else if (password.length < 6) {
                showError("passwordError", "Minimum 6 characters");
                isValid = false;
            }

            // CONFIRM PASSWORD
            if (!confirmPassword) {
                showError("confirmPasswordError", "Confirm password");
                isValid = false;
            } else if (password !== confirmPassword) {
                showError("confirmPasswordError", "Passwords do not match");
                isValid = false;
            }

            // CHECKBOXES
            isValid &= validateCheckbox(
                document.getElementById("consent").checked,
                "consentError",
                "Required"
            );

            isValid &= validateCheckbox(
                document.getElementById("privacy").checked,
                "privacyError",
                "Required"
            );

            if (isValid) {
                alert("Signup successful");
                signupForm.reset();
                clearErrors(signupForm);
            }
        });
    }
    // =====================================================
    //  LOGIN FORM
    // =====================================================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            clearErrors(loginForm);
            let isValid = true;

            isValid &= validateField(
                document.getElementById("loginName").value.trim(),
                "loginNameError",
                {
                    required: "Name is required",
                    pattern: patterns.name,
                    invalid: "Only letters, min 3 characters"
                }
            );

            isValid &= validateField(
                document.getElementById("loginEmail").value.trim(),
                "loginEmailError",
                {
                    required: "Email is required",
                    pattern: patterns.email,
                    invalid: "Enter valid email"
                }
            );

            if (isValid) {
                alert("Login successful");
                loginForm.reset();
                clearErrors(loginForm);
            }
        });
    }
    // =====================================================
    //  COUPON CODE
    // =====================================================

    const couponBtn = document.getElementById("applyCouponBtn");

    if (couponBtn) {
        couponBtn.addEventListener("click", function () {

            const code = document.getElementById("couponCode").value.trim();
            const errorEl = document.getElementById("couponError");

            errorEl.textContent = "";

            if (!code) {
                errorEl.textContent = "Coupon code is required";
                return;
            }

            // Example validation (you can change logic)
            if (code.length !== 8) {
                errorEl.textContent = "Coupon code must be exactly 8 characters";
                return;
            }

            alert("Coupon applied successfully");

            document.getElementById("couponCode").value = "";
            errorEl.textContent = "";
        });
    }
    // =====================================================
    //  SIGN IN FORM
    // =====================================================

    const signInForm = document.getElementById("signInForm");

    if (signInForm) {
        signInForm.addEventListener("submit", function (e) {
            e.preventDefault();

            clearErrors(signInForm);

            let isValid = true;

            isValid &= validateField(
                document.getElementById("signInEmail").value.trim(),
                "signInEmailError",
                {
                    required: "Email is required",
                    pattern: patterns.email,
                    invalid: "Enter a valid email"
                }
            );

            const password = document.getElementById("signInPassword").value.trim();

            if (!password) {
                showError("signInPasswordError", "Password is required");
                isValid = false;
            } else if (password.length < 6) {
                showError("signInPasswordError", "Minimum 6 characters");
                isValid = false;
            }

            if (isValid) {
                alert("Login successful");

                signInForm.reset();
                clearErrors(signInForm);
            }
        });
    }
    // =========================
    // CHECKOUT FORM VALIDATION
    // =========================

    const phonePattern = /^[0-9]{10}$/;
    const zipPattern = /^[0-9]{4,10}$/;

    function validateOnBlur(inputId, errorId, rules) {
        const input = document.getElementById(inputId);

        if (!input) return;

        input.addEventListener("blur", function () {
            const value = this.value.trim();

            showError(errorId, "");

            if (!value) {
                showError(errorId, rules.required);
                return;
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                showError(errorId, rules.invalid);
                return;
            }

            showError(errorId, "");
        });
    }


    document.getElementById("saveChangeBtn").addEventListener("click", function () {

        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmNewPassword").value.trim();

        showError("currentPasswordError", "");
        showError("newPasswordError", "");
        showError("confirmNewPasswordError", "");

        // If any password field is filled, all become required
        if (currentPassword || newPassword || confirmPassword) {

            if (currentPassword === "") {
                showError("currentPasswordError", "Current password is required");
                return;
            }

            if (newPassword === "") {
                showError("newPasswordError", "New password is required");
                return;
            }

            if (newPassword.length < 6) {
                showError("newPasswordError", "Minimum 6 characters");
                return;
            }


            if (confirmPassword === "") {
                showError("confirmNewPasswordError", "Confirm password is required");
                return;
            }


            if (newPassword !== confirmPassword) {
                showError("confirmNewPasswordError", "Passwords do not match");
                return;
            }
        }

        alert("Account updated successfully!");

        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmNewPassword").value = "";
    });


    // =========================
    // FIRST NAME
    // =========================
    validateOnBlur(
        "billingFirstName",
        "billingFirstNameError",
        {
            required: "First name is required",
            pattern: patterns.name,
            invalid: "Only letters, minimum 3 characters"
        }
    );

    // =========================
    // LAST NAME
    // =========================
    validateOnBlur(
        "billingLastName",
        "billingLastNameError",
        {
            required: "Last name is required",
            pattern: patterns.name,
            invalid: "Only letters, minimum 3 characters"
        }
    );

    // =========================
    // EMAIL
    // =========================
    validateOnBlur(
        "billingEmail",
        "billingEmailError",
        {
            required: "Email is required",
            pattern: patterns.email,
            invalid: "Enter a valid email"
        }
    );

    // =========================
    // PHONE
    // =========================
    validateOnBlur(
        "billingPhone",
        "billingPhoneError",
        {
            required: "Phone number is required",
            pattern: phonePattern,
            invalid: "Enter a valid 10-digit phone number"
        }
    );

    // =========================
    // STREET ADDRESS
    // =========================
    validateOnBlur(
        "streetAddress",
        "streetAddressError",
        {
            required: "Street address is required"
        }
    );

    // =========================
    // CITY
    // =========================
    validateOnBlur(
        "city",
        "cityError",
        {
            required: "City is required",
            pattern: patterns.name,
            invalid: "Enter a valid city name"
        }
    );

    // =========================
    // STATE
    // =========================
    validateOnBlur(
        "state",
        "stateError",
        {
            required: "State is required",
            pattern: patterns.name,
            invalid: "Enter a valid state name"
        }
    );

    // =========================
    // ZIP CODE
    // =========================
    validateOnBlur(
        "zip",
        "zipError",
        {
            required: "Zip code is required",
            pattern: zipPattern,
            invalid: "Enter a valid zip code"
        }
    );

    validateOnBlur(
        "accountFirstName",
        "accountFirstNameError",
        {
            required: "First name is required",
            pattern: patterns.name,
            invalid: "Only letters, minimum 3 characters"
        }
    );

    validateOnBlur(
        "accountLastName",
        "accountLastNameError",
        {
            required: "Last name is required",
            pattern: patterns.name,
            invalid: "Only letters, minimum 3 characters"
        }
    );

    validateOnBlur(
        "displayName",
        "displayNameError",
        {
            required: "Display name is required",
            pattern: patterns.name,
            invalid: "Only letters, minimum 3 characters"
        }
    );

    validateOnBlur(
        "displayEmail",
        "displayEmailError",
        {
            required: "Email is required",
            pattern: patterns.email,
            invalid: "Enter a valid email"
        }
    );

    document.getElementById("placeOrderBtn").addEventListener("click", function () {

        document.querySelectorAll("input").forEach(input => {

            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else {
                input.value = "";
            }

        });

        document.querySelectorAll("textarea").forEach(textarea => {
            textarea.value = "";
        });

        // Clear all error messages
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        document.getElementById("selectedText").textContent = "Select Country";

        alert("Order placed successfully!");
    });

});

document.querySelectorAll(".qty-box").forEach(box => {

    const qty = box.querySelector(".qty");
    const plusBtn = box.querySelector(".plusBtn");
    const minusBtn = box.querySelector(".minusBtn");

    plusBtn.addEventListener("click", () => {
        qty.textContent = Number(qty.textContent) + 1;
    });

    minusBtn.addEventListener("click", () => {
        let value = Number(qty.textContent);

        if (value > 1) {
            qty.textContent = value - 1;
        }
    });

});
document.addEventListener("DOMContentLoaded", () => {

    const wishlistCount = document.getElementById("wishlistCount");

    document.querySelectorAll(".wish-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            console.log("Heart clicked");

            wishlistCount.textContent =
                Number(wishlistCount.textContent) + 1;
        });
    });

});

const checkPayment = document.getElementById("checkPayment");
const codBox = document.getElementById("codBox");

checkPayment.addEventListener("click", function () {

    if (this.checked && !this.dataset.clicked) {

        codBox.classList.remove("d-none");
        this.dataset.clicked = "true";
    } else {

        this.checked = false;
        codBox.classList.add("d-none");
        this.dataset.clicked = "";
    }

});
