<template>
	<div class="row">
		<!-- left sidebar -->
		<div class="col-4 bg-dark text-light text-center left-panel">
			<img class="w-100 p-2 rounded-pill" src="https://randomuser.me/api/portraits/men/41.jpg" />
			<h2 class="px-2 pt-3 pb-2">Imię i nazwisko</h2>
            <h6 class="bi bi-phone">123456789</h6>
            <h6 class="bi bi-envelope">mymailtest@test.com</h6>
			<h6 class="bi bi-github">github.com/placeholder</h6>
			<h6 class="bi bi-linkedin">linkedin.com/placeholder</h6>
			<h2>Umiejętności</h2>
			<ul>
				<li>Lorem ipsum dolor sit amet.</li>
				<li>Lorem ipsum dolor sit amet.</li>
				<li>Lorem ipsum dolor sit amet.</li>
				<li>Lorem ipsum dolor sit amet.</li>
				<li>Lorem ipsum dolor sit amet.</li>
			</ul>
			<h2>Języki:</h2>
			<p>Język polski: ojczysty</p>
			<p>Język angielski: B2</p>
			<h2>Zainteresowania:</h2>
			<ul>
				<li>Lorem, ipsum dolor.</li>
				<li>Lorem, ipsum dolor.</li>
			</ul>
		</div>

		<!-- main content -->
		<div class="col-8 pt-0 mt-0 right-panel">
			<div class="card bg-light pt-0 mt-0">
				<h2>O mnie</h2>
				<p class="topBorder">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
					debitis sapiente odit deleniti asperiores eveniet ipsam
					excepturi eum. Hic, impedit autem maxime deleniti veritatis
					fugiat ab porro doloribus itaque nobis!
				</p>
			</div>

			<div class="card bg-light">

				<h2>Wykształcenie</h2>
				<div class="row topBorder">
					<div class="col-3">
						<p class="education-dates">2018-09</p>
						<p class="education-dates text-end">- 2021-07</p>
						</div>
					<div class="col-9">
						<h5>Lorem, ipsum.</h5>
						<p>Lorem ipsum dolor sit amet consectetur.</p>
					</div>
				</div>
				<div class="row topBorder">
					<div class="col-3">
						<p class="education-dates">2018-09</p>
						<p class="education-dates text-end">- 2021-07</p>
						</div>
					<div class="col-9">
						<h5>Lorem, ipsum.</h5>
						<p>Lorem ipsum dolor sit amet consectetur.</p>
					</div>
				</div>
			</div>
			<div class="card bg-light">
				<h2>Projekty</h2>
				<div class="row topBorder">
					<div class="col-4">
						<img class="w-100 m-auto" src="../../../public/laravel-application.jpg">
					</div>
					<div class="col-8">
						<h5>Lorem, ipsum dolor.</h5>
						<p>
							Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Quo ipsa tempore mollitia
							ullam pariatur autem nulla. Magnam eligendi at
							rem.
						</p>
					</div>
				</div>
				<div class="row topBorder">
					<div class="col-4">
						<img class="w-100 m-auto" src="../../../public/tasks.jpg">
					</div>
					<div class="col-8">
						<h5>Lorem, ipsum dolor.</h5>
						<p>
							Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Quo ipsa tempore mollitia
							ullam pariatur autem nulla. Magnam eligendi at
							rem.
						</p>
					</div>
				</div>
			</div>
			<p class="rodo">
				Wyrażam zgodę na przetwarzanie moich danych osobowych dla
				potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z
				Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z
				dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
				związku z przetwarzaniem danych osobowych i w sprawie swobodnego
				przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
				(RODO).
			</p>
		</div>
	</div>
</template>

<style>
	.left-panel > h6::before {
		margin-right: 0.75rem;
	}

	.left-panel > h6 {
		text-align: left;
		margin-left: 1rem
	}
	.left-panel > h2:first-child {
		margin: 0.5rem;
	}

	.left-panel > h2 {
		margin: 2rem 0.5rem;
	}

	 ul {
		padding: 0;
	}

	 ul > li {
		padding: 0.5rem 0;
		list-style: none;
	}

	.card {
		margin: 1rem 0.5rem;
		padding: 0.75rem;
	}
	
	.education-dates {
		margin: 0;
	}
	
	.topBorder {
		border-top: 1px solid #dee2e6;
		padding-top: 1rem;
	}

	.rodo {
		font-size: 12px;
	}
</style>