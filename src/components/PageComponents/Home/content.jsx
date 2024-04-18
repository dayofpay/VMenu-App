const HomeContent = () => {
    return (
        <>
<div className="page-content">
			<div className="content-inner pt-0">
				<div className="container p-b30">

					<div className="search-box mb-4">
						<div className="mb-3 input-group input-radius">
							<span className="input-group-text">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z"
										fill="#7D8FAB" />
								</svg>
							</span>
							<input type="text" placeholder="Search beverages or foods"
								className="form-control main-in ps-0 bs-0"/>
						</div>
					</div>

					<div className="dashboard-area">

						<div className="m-b10">
							<div className="swiper-btn-center-lr">
								<div className="swiper tag-group mt-4 recomand-swiper">
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<div className="card add-banner"
												style={{backgroundImage: "url(assets/images/background/bg2.png)"}}>
												<div className="circle-1"></div>
												<div className="circle-2"></div>
												<div className="card-body">
													<div className="card-info">
														<span className="font-12 font-w500 text-dark">Happy Weekend</span>
														<h1 data-text="20% OFF" className="title mb-2">20% OFF</h1>
														<small>*for All Menus</small>
													</div>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="card add-banner"
												style={{backgroundImage: "url(assets/images/background/bg3.png)"}}>
												<div className="circle-1"></div>
												<div className="circle-2"></div>
												<div className="card-body">
													<div className="card-info">
														<span className="font-12 font-w500 text-dark">Happy Weekend</span>
														<h1 data-text="25% OFF" className="title mb-2">25% OFF</h1>
														<small>*for All Menus</small>
													</div>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="card add-banner"
												style={{backgroundImage: "url(assets/images/background/bg4.png)"}}>
												<div className="circle-1"></div>
												<div className="circle-2"></div>
												<div className="card-body">
													<div className="card-info">
														<span className="font-12 font-w500 text-dark">Happy Weekend</span>
														<h1 data-text="15% OFF" className="title mb-2">15% OFF</h1>
														<small>*for All Menus</small>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="title-bar mt-0">
							<span className="title mb-0 font-18">Categories</span>
							<a className="btn-link" href="product-categorie.html">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z"
										fill="#7D8FAB" />
								</svg>
							</a>
						</div>
						<div className="categories-box">
							<div className="swiper-btn-center-lr">
								<div className="swiper categorie-swiper">
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<a href="product-categorie.html">
												<div className="categore-box"
													style={{backgroundImage: "url(assets/images/background/small/bg1.png)"}}>
													<svg width="24" height="24" viewBox="0 0 19 23" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															d="M18.9488 7.87554C18.9488 5.85452 17.3047 4.21039 15.2837 4.21039C14.1548 4.21039 13.1438 4.72381 12.4709 5.52889C11.9729 4.93307 11.2896 4.4979 10.5105 4.31145V4.25301C10.5105 3.38351 11.2178 2.67615 12.0873 2.67615C12.5581 2.67615 12.9397 2.29458 12.9397 1.82379C12.9397 1.35299 12.5581 0.971428 12.0873 0.971428C10.2779 0.971428 8.80573 2.44358 8.80573 4.25301V4.31145C8.02662 4.4979 7.34324 4.93307 6.8453 5.52889C6.17241 4.72381 5.16139 4.21039 4.03252 4.21039C2.01149 4.21039 0.367371 5.85452 0.367371 7.87554C0.367371 9.80417 1.86499 11.3884 3.75816 11.5294C3.39291 12.0992 3.18016 12.7756 3.18016 13.5011C3.18016 15.4297 4.67778 17.0139 6.57095 17.1549C6.2057 17.7248 5.99294 18.4012 5.99294 19.1267C5.99294 21.1477 7.63707 22.7918 9.65809 22.7918C11.6791 22.7918 13.3232 21.1477 13.3232 19.1267C13.3232 18.4012 13.1105 17.7248 12.7452 17.1549C14.6384 17.0139 16.136 15.4297 16.136 13.5011C16.136 12.7756 15.9233 12.0992 15.558 11.5294C17.4512 11.3884 18.9488 9.80417 18.9488 7.87554ZM9.6521 5.91528C9.6541 5.91528 9.65609 5.91561 9.65809 5.91561C9.66009 5.91561 9.66209 5.91528 9.66408 5.91528C10.7424 5.91861 11.6185 6.79661 11.6185 7.87554C11.6185 8.95647 10.739 9.83597 9.65809 9.83597C8.57716 9.83597 7.69766 8.95647 7.69766 7.87554C7.69766 6.79661 8.57383 5.91861 9.6521 5.91528ZM4.03252 9.83597C2.95159 9.83597 2.07209 8.95647 2.07209 7.87554C2.07209 6.79461 2.95159 5.91511 4.03252 5.91511C5.11345 5.91511 5.99294 6.79461 5.99294 7.87554C5.99294 8.95647 5.11345 9.83597 4.03252 9.83597ZM6.8453 15.4615C5.76437 15.4615 4.88488 14.582 4.88488 13.5011C4.88488 12.4202 5.76437 11.5407 6.8453 11.5407C7.92624 11.5407 8.80573 12.4202 8.80573 13.5011C8.80573 14.582 7.92624 15.4615 6.8453 15.4615ZM9.65809 21.0871C8.57716 21.0871 7.69766 20.2076 7.69766 19.1267C7.69766 18.0458 8.57716 17.1663 9.65809 17.1663C10.739 17.1663 11.6185 18.0458 11.6185 19.1267C11.6185 20.2076 10.739 21.0871 9.65809 21.0871ZM12.4709 15.4615C11.3899 15.4615 10.5105 14.582 10.5105 13.5011C10.5105 12.4202 11.3899 11.5407 12.4709 11.5407C13.5518 11.5407 14.4313 12.4202 14.4313 13.5011C14.4313 14.582 13.5518 15.4615 12.4709 15.4615ZM15.2837 9.83597C14.2027 9.83597 13.3232 8.95647 13.3232 7.87554C13.3232 6.79461 14.2027 5.91511 15.2837 5.91511C16.3646 5.91511 17.2441 6.79461 17.2441 7.87554C17.2441 8.95647 16.3646 9.83597 15.2837 9.83597Z"
															fill="white" />
													</svg>
													<h6 className="font-14 text-white mb-0">Fruits</h6>
													<span className="text-white">45 Items</span>
												</div>
											</a>
										</div>
										<div className="swiper-slide">
											<a href="product-categorie.html">
												<div className="categore-box bg-2"
													style={{backgroundImage: "url(assets/images/background/small/bg2.png)"}}>
													<svg width="23" height="23" viewBox="0 0 23 23" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_359_32)">
															<path
																d="M22.3197 11.5459C21.4112 9.97531 20.1046 8.65803 18.5413 7.7365C17.9885 7.41056 17.4079 7.13734 16.808 6.91909C16.5004 6.14443 16.0027 5.45431 15.3442 4.90621C14.3065 4.04238 12.9945 3.63453 11.6498 3.7574C10.3052 3.88039 9.08895 4.51962 8.22513 5.55745C7.98732 5.84312 8.02611 6.26746 8.31182 6.50527L9.23206 7.27133C9.08022 7.34706 8.92867 7.42607 8.7775 7.51041C7.69923 8.11235 6.64818 8.93679 5.71264 9.91198L1.59021 7.61624C1.32048 7.46601 0.982986 7.5186 0.771857 7.74392C0.560642 7.9692 0.529787 8.30929 0.697147 8.56883L2.94499 12.0561L0.705628 15.3611C0.536393 15.611 0.554079 15.9429 0.748971 16.1733C0.943862 16.4037 1.26827 16.4762 1.54264 16.3507L6.12905 14.2534C7.06933 15.1353 8.05837 15.8521 9.07446 16.3875C9.12808 16.4158 9.18173 16.4425 9.23539 16.4697L8.28505 17.2607C8.14786 17.3749 8.06165 17.5389 8.04541 17.7167C8.02917 17.8944 8.08419 18.0713 8.19837 18.2085C9.19673 19.4079 10.6371 20.0273 12.0878 20.0273C13.228 20.0273 14.3746 19.6445 15.3175 18.8597C15.9729 18.3141 16.4691 17.628 16.7769 16.8578C17.3878 16.6377 17.9788 16.3609 18.5412 16.0294C20.1044 15.1079 21.411 13.7906 22.3196 12.2199C22.4403 12.0115 22.4403 11.7544 22.3197 11.5459ZM11.7723 5.09782C12.7588 5.00734 13.7216 5.30694 14.483 5.94076C14.6638 6.09128 14.8276 6.25681 14.9743 6.43427C14.3922 6.33531 13.8003 6.28477 13.2049 6.28477C12.3511 6.28477 11.4946 6.42264 10.643 6.69454L9.73662 5.93999C10.3094 5.46109 11.0129 5.16728 11.7723 5.09782ZM14.4565 17.8251C13.0613 18.9865 11.0582 18.9481 9.71058 17.8254L10.6359 17.0552C11.4962 17.3382 12.3556 17.4811 13.2049 17.4811C13.7897 17.4811 14.3711 17.4325 14.9432 17.3369C14.7976 17.5124 14.6355 17.6761 14.4565 17.8251ZM13.2049 16.1351C10.3521 16.1351 7.93022 14.1539 6.74045 12.973C6.61157 12.8451 6.44021 12.7776 6.26616 12.7776C6.17159 12.7776 6.07621 12.7976 5.98646 12.8386L3.1672 14.1278L4.30884 12.4429C4.46014 12.2195 4.4635 11.9275 4.31732 11.7007L3.28648 10.1015L5.52004 11.3453C5.79548 11.4987 6.14035 11.4403 6.35003 11.205C8.37323 8.93355 10.8717 7.63077 13.2049 7.63077C16.3393 7.63077 19.2712 9.25025 20.9498 11.8829C19.2712 14.5156 16.3394 16.1351 13.2049 16.1351Z"
																fill="white" />
															<path
																d="M16.4618 11.868C17.0499 11.868 17.5267 11.3912 17.5267 10.803C17.5267 10.2149 17.0499 9.73811 16.4618 9.73811C15.8736 9.73811 15.3969 10.2149 15.3969 10.803C15.3969 11.3912 15.8736 11.868 16.4618 11.868Z"
																fill="white" />
														</g>
														<defs>
															<clipPath id="clip0_359_32">
																<rect width="21.8204" height="21.8204" fill="white"
																	transform="translate(0.589783 0.971428)" />
															</clipPath>
														</defs>
													</svg>
													<h6 className="font-14 text-white mb-0">Fish</h6>
													<span className="text-white">45 Items</span>
												</div>
											</a>
										</div>
										<div className="swiper-slide">
											<a href="product-categorie.html">
												<div className="categore-box bg-3"
													style={{backgroundImage: "url(assets/images/background/small/bg3.png)"}}>
													<svg width="23" height="23" viewBox="0 0 23 23" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_359_47)">
															<path
																d="M21.7594 3.01442C21.6162 2.89556 21.4377 2.79362 21.2135 2.70276C20.9515 2.59656 20.7322 2.41458 20.5794 2.17651C20.4487 1.97297 20.3156 1.81622 20.1723 1.69732C19.7785 1.37052 19.281 1.2168 18.7719 1.2644C18.2626 1.31209 17.8023 1.55553 17.4758 1.94987C16.997 2.52828 16.9072 3.30649 17.2021 3.95811L16.0617 5.336C15.0224 5.3054 14.0499 5.74223 13.3815 6.54396C13.2128 6.7464 13.0008 6.90297 12.7625 7.00496C12.1175 6.83803 11.2655 6.81126 10.7867 6.81126C6.3528 6.81126 2.74553 10.4431 2.74553 14.9071C2.74553 15.7756 2.38916 16.1321 1.8959 16.6256C1.33215 17.1895 0.630615 17.8913 0.630615 19.3811C0.630615 19.4904 0.636837 19.6022 0.649154 19.7134C0.82555 21.3073 2.18579 22.5092 3.8132 22.5092H14.7898V22.5093C14.7918 22.5093 14.7937 22.5092 14.7956 22.5092H14.8504V22.5084C17.8626 22.4717 20.3031 19.7034 20.3031 16.3054C20.3031 14.3601 19.5783 12.4946 18.3943 11.3488C18.3962 11.1448 18.4596 10.9551 18.5739 10.8139C19.1018 10.1618 19.3655 9.33927 19.3165 8.4977C19.2968 8.16089 19.2256 7.83209 19.1087 7.52068L20.0876 6.3538C20.7831 6.52427 21.5319 6.29145 22.0116 5.71197C22.6849 4.89869 22.5718 3.6886 21.7594 3.01442ZM14.3635 7.36261C14.7904 6.85055 15.4181 6.57865 16.0842 6.61645C17.1204 6.67527 17.9795 7.53428 18.0401 8.57211C18.0705 9.09499 17.9072 9.60547 17.5801 10.0095C17.2812 10.3787 17.1162 10.8562 17.1155 11.3552V11.3592C17.1128 12.2369 16.7644 13.0591 16.1345 13.6742C15.5064 14.2877 14.678 14.6165 13.803 14.5976C12.0697 14.562 10.6662 13.1191 10.6744 11.3811C10.6813 9.95037 11.6046 8.70768 12.9722 8.28887C13.5162 8.12223 13.9973 7.80192 14.3635 7.36261ZM9.38379 21.2307H5.6338V20.1457C5.6338 18.6672 7.24442 17.4645 9.22415 17.4645H9.38379V21.2307ZM19.0245 16.3054C19.0245 19.0191 17.1279 21.2271 14.7954 21.2307H10.6624V16.1859H9.22415C7.95179 16.1859 6.74936 16.5798 5.83849 17.2949C4.88197 18.0458 4.35521 19.0582 4.35521 20.1457V21.2307H3.8132C2.83848 21.2307 2.02461 20.5179 1.92002 19.5728C1.91286 19.5081 1.90924 19.4436 1.90924 19.3811C1.90924 18.4207 2.30239 18.0273 2.80017 17.5294C3.34547 16.9839 4.02411 16.305 4.02411 14.9071C4.02411 11.148 7.05779 8.08976 10.7867 8.08976C10.8029 8.08976 10.8188 8.08997 10.8349 8.09006C10.6436 8.26833 10.4668 8.46254 10.3089 8.67171C9.71634 9.4566 9.40063 10.3914 9.39594 11.375C9.38439 13.8069 11.3496 15.826 13.7769 15.8759C13.8088 15.8765 13.8404 15.8768 13.8722 15.8768C15.0578 15.8768 16.1754 15.4215 17.0279 14.5889C17.5003 14.1275 17.8588 13.5823 18.0898 12.9861C18.6745 13.8852 19.0245 15.0863 19.0245 16.3054ZM21.0267 4.89669C20.8266 5.13833 20.4862 5.19877 20.2175 5.04044L19.751 4.76568L18.3947 6.38248C18.3747 6.36151 18.3552 6.3402 18.3346 6.31966C18.0699 6.05509 17.7666 5.83957 17.4383 5.67796L18.8274 3.99962L18.4699 3.59024C18.264 3.35439 18.2601 3.00739 18.4607 2.76511C18.5692 2.63406 18.722 2.55317 18.891 2.53736C19.06 2.52159 19.2249 2.57265 19.3557 2.68115C19.3699 2.69291 19.4225 2.74116 19.5034 2.86722C19.7997 3.32877 20.2249 3.68161 20.733 3.88758C20.8717 3.94384 20.9287 3.98654 20.9429 3.9983C21.2134 4.22277 21.251 4.62581 21.0267 4.89669Z"
																fill="white" />
														</g>
														<defs>
															<clipPath id="clip0_359_47">
																<rect width="21.8204" height="21.8204" fill="white"
																	transform="translate(0.630615 0.971428)" />
															</clipPath>
														</defs>
													</svg>
													<h6 className="font-14 text-white mb-0">Chicken</h6>
													<span className="text-white">45 Items</span>
												</div>
											</a>
										</div>
										<div className="swiper-slide">
											<a href="product-categorie.html">
												<div className="categore-box bg-4"
													style={{backgroundImage: "url(assets/images/background/small/bg4.png)"}}>
													<svg width="23" height="23" viewBox="0 0 23 23" fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_359_59)">
															<path
																d="M21.442 5.23551C21.3107 4.4723 20.8559 3.80552 20.1942 3.40612C17.5555 1.81353 14.5353 0.971733 11.46 0.971733C8.38471 0.971733 5.36447 1.81353 2.72583 3.40616C2.06408 3.80556 1.60926 4.47234 1.47796 5.23555C1.3461 6.0019 1.5532 6.78609 2.04619 7.38713C2.28106 7.67346 2.57118 7.90485 2.89603 8.07028L4.90285 11.6064C4.86545 11.7965 4.84533 11.9927 4.84533 12.1937C4.84533 13.5231 5.70437 14.6549 6.89626 15.0653L11.4647 22.7926L20.0233 8.07063C20.3484 7.90515 20.6387 7.67368 20.8738 7.38717C21.3667 6.78609 21.5739 6.0019 21.442 5.23551V5.23551ZM6.13511 12.1936C6.13511 11.2303 6.91879 10.4467 7.88209 10.4467C8.84538 10.4467 9.62906 11.2303 9.62906 12.1936C9.62906 13.1569 8.84538 13.9406 7.88209 13.9406C6.91879 13.9406 6.13511 13.1569 6.13511 12.1936ZM11.4553 20.2424L8.45931 15.1747C9.85859 14.9043 10.9188 13.6708 10.9188 12.1936C10.9188 10.5192 9.55657 9.15689 7.88209 9.15689C6.96797 9.15689 6.14754 9.56343 5.59035 10.2046L4.52542 8.32816C4.86915 8.27442 5.20273 8.15485 5.50609 7.97239C7.28805 6.90058 9.32445 6.32955 11.399 6.31854C11.2668 6.66231 11.1969 7.03067 11.1969 7.40991C11.1969 9.0844 12.5591 10.4467 14.2336 10.4467C15.7526 10.4467 17.0145 9.32568 17.2358 7.86753C17.2955 7.90197 17.3548 7.93688 17.4139 7.97239C17.7137 8.15274 18.0431 8.27179 18.3827 8.32639L15.8867 12.6198C15.4596 12.3992 14.9833 12.2811 14.4937 12.2811C12.8193 12.2811 11.457 13.6434 11.457 15.3179C11.457 16.3654 11.9899 17.3141 12.8378 17.8644L11.4553 20.2424ZM15.9714 7.23725C15.977 7.29452 15.9806 7.35209 15.9806 7.40991C15.9806 8.37321 15.1969 9.15689 14.2336 9.15689C13.2703 9.15689 12.4867 8.37321 12.4867 7.40991C12.4867 7.04185 12.6002 6.69125 12.81 6.39752C13.8981 6.5259 14.9626 6.80892 15.9714 7.23725V7.23725ZM12.7468 15.3179C12.7468 14.3546 13.5304 13.5709 14.4937 13.5709C14.7535 13.5709 15.0066 13.6287 15.2371 13.7372L13.4874 16.7469C13.031 16.4259 12.7468 15.8982 12.7468 15.3179ZM19.8765 6.5691C19.4375 7.10432 18.6813 7.22965 18.0787 6.86713C16.0785 5.6641 13.7898 5.02824 11.4599 5.02824C9.13008 5.02824 6.8414 5.6641 4.84129 6.86713C4.23853 7.2296 3.48246 7.10432 3.04341 6.5691C2.78799 6.25775 2.68068 5.85138 2.74904 5.45426C2.81684 5.06023 3.05128 4.7162 3.3923 4.51039C5.82982 3.03917 8.61958 2.26152 11.46 2.26152C14.3004 2.26152 17.0902 3.03917 19.5277 4.51039C19.8687 4.7162 20.1031 5.06023 20.1709 5.45426C20.2393 5.85138 20.1319 6.25775 19.8765 6.5691V6.5691Z"
																fill="white" />
														</g>
														<defs>
															<clipPath id="clip0_359_59">
																<rect width="21.8208" height="21.8208" fill="white"
																	transform="translate(0.549561 0.971733)" />
															</clipPath>
														</defs>
													</svg>
													<h6 className="font-14 text-white mb-0">Pizzas</h6>
													<span className="text-white">45 Items</span>
												</div>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="title-bar">
							<span className="title mb-0 font-18">Popular Deals</span>
						</div>
						<div className="row g-3 mb-3">
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food8.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button"><i className="fa-regular fa-heart"></i></div>
										</a>
										<div className="label">5% OFF</div>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Fresh Grapes</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food4.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button"><i className="fa-regular fa-heart"></i></div>
										</a>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Gurame Fish</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food5.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button"><i className="fa-regular fa-heart"></i></div>
										</a>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Tomatoes</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food3.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button active"><i className="fa-regular fa-heart"></i></div>
										</a>
										<div className="label">5% OFF</div>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Chicken Village</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food6.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button"><i className="fa-regular fa-heart"></i></div>
										</a>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Fresh Milk</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card-item style-1">
									<div className="dz-media">
										<img src="assets/images/food/food7.png" alt="image"/>
										<a href="#" className="r-btn">
											<div className="like-button"><i className="fa-regular fa-heart"></i></div>
										</a>
									</div>
									<div className="dz-content">
										<h6 className="title mb-3"><a href="product.html">Fresh Avocados</a></h6>
										<div className="dz-meta">
											<ul>
												<li className="price text-accent">$ 10.9</li>
												<li className="review">
													<span className="text-soft font-10">(243)</span>
													<i className="fa fa-star"></i>
												</li>
											</ul>
										</div>
										<div className="mt-2">
											<a className="btn btn-primary add-btn light" href="#">Add to
												cart</a>
											<div className="dz-stepper border-1 rounded-stepper stepper-fill">
												<input className="stepper" type="text" name="demo3" readOnly/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>

					<h6 className="title-head mb-3">Other Login w3Grocery package</h6>
					<div className="row g-3">
						<div className="col-6">
							<div className="package-box box-1">
								<div className="media media-70">
									<img src="assets/images/package/shop.svg" alt="image"/>
								</div>
								<h6 className="title-head">W3 Vendor</h6>
								<p className="sub-title">Continue With Vendor</p>
								<a href="vendors/onboarding.html" className="btn package-btn">Click Now
									<i className="fa-solid fa-arrow-right ms-2"></i>
								</a>
							</div>
						</div>
						<div className="col-6">
							<div className="package-box box-2">
								<div className="media media-70">
									<img src="assets/images/package/boy.svg" alt="image"/>
								</div>
								<h6 className="title-head">W3 Driver</h6>
								<p className="sub-title">Continue With Driver</p>
								<a href="driver/onboarding.html" className="btn package-btn">Click Now
									<i className="fa-solid fa-arrow-right ms-2"></i>
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
        </>
    )
}

export default HomeContent