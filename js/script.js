window.addEventListener('load', () => {
	const wrapper = document.querySelector('.wrapper');
	const container = document.querySelector('.container');
	let lazyImgs = document.querySelectorAll('.lazy');
	const loaderEl = document.querySelector('.loader');

	const imageObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.src = entry.target.dataset.src;
					observer.unobserve(entry.target);
				}
			});
		},
		{
			rootMargin: '50px 0px 0px',
		}
	);

	const infinityObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					observer.unobserve(entry.target);
					loadUnsplashImages();
				}
			});
		},
		{
			rootMargin: '50px 0px 0px',
		}
	);

	async function getPhotos() {
		const res = await fetch(
			'https://api.unsplash.com/photos/random?count=30&client_id=orP729jaxFZc2SE2wRtYjCvDXb4WgrUsGIz-3q7UMJ0'
		);
		const data = await res.json();
		return data;
	}

	async function loadUnsplashImages() {
		const data = await getPhotos();
		data.forEach((item) => {
			const imgBlock = document.createElement('div');
			imgBlock.classList.add('img-block');
			imgBlock.innerHTML = `
        <a href="${item.links.html}" target="_blank">
          <img class="img lazy"
            src="data:image/gif;base64,R0lGODlhCgAIAIABAN3d3f///yH5BAEAAAEALAAAAAAKAAgAAAINjAOnyJv2oJOrVXrzKQA7"
            data-src="${item.urls.regular}"
            alt="" />
        </a>
      `;
			container.append(imgBlock);
			lazyImgs = document.querySelectorAll('.lazy');
			lazyImgs.forEach((img) => {
				imageObserver.observe(img);
			});
		});

		const lastImg = document.querySelector('.img-block:last-child');
		infinityObserver.observe(lastImg);

		hiddenLoader();
	}

	function hiddenLoader() {
		loaderEl.classList.add('hidden');
	}

	loadUnsplashImages();
});
