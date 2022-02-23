// Elevator

class Elevator {
    isActive = false;
    isLock = false;

    constructor() {
        this.elevator = document.createElement("div");
        this.elevator.id = "elevator";
        document.body.appendChild(this.elevator);

        document.addEventListener("scroll", () => {
            if (this.isLock) {
                return;
            }

            if (!this.isActive && window.scrollY > 400) {
                this.isActive = true;
                this.elevator.classList.add("active");
            } else if (this.isActive && window.scrollY < 400) {
                this.isLock = true;
                this.isActive = false;
                this.elevator.classList.add("leave");
                setTimeout(() => {
                    this.elevator.classList.remove("leave", "active");
                    this.isLock = false;
                }, 300)
            }
        }, true)

        this.elevator.addEventListener("click", () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        })
    }
}

new Elevator()

// Github

class Github {

    constructor() {
        this.els = document.querySelectorAll(".github");

        this.els.forEach((el, id) => {
            const count = el.getAttribute("data-github-count") || 4;
            const page = el.getAttribute("data-github-page") || 1;
            const sort = el.getAttribute("data-github-sort") || "created"; // pushed

            this.setRepos(id, count, page, sort).catch(console.error);
        })
    }

    async setRepos(id, count, page, sort) {
        const xhr = new XMLHttpRequest();
        const ctx = this;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === this.DONE) {
                JSON.parse(this.response).forEach(item => ctx.createElement(id, item))
            }
        });

        xhr.open(
            "GET",
            `https://api.github.com/users/ermos/repos?sort=created&per_page=${count}&page=${page}&desc`
        );

        xhr.send();

        return true;
    }

    createElement(parentId, item) {
        const a = document.createElement("a");
        a.className = "github__item github__card";
        a.href = item.html_url;
        a.target = "_blank";
        const description = item.description === null ? "no description 😒" :
            item.description.length > 45 ?
            item.description.substring(0, 45) + "..." :
            item.description
        a.innerHTML = `
        <h3 class="github__title">${item.full_name}</h3>
        <p class="github__desc">${description}</p>
        <div class="github__info">
            ${item.language ? '<span class="github__lang">' + item.language + '</span>' : '<span></span>'}
            <div class="github__stats">
                <span>${item.stargazers_count} <i class="icon-star"></i></span>
                <span>${item.forks_count} <i class="icon-share"></i></span>
            </div>
        </div>
        `;

        this.els[parentId].appendChild(a);
    }
}

new Github()
