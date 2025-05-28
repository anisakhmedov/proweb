<template>
    <aside>
        <div class="positions">
            <p class="title">PROWEB</p>

            <nav>
                <RouterLink class="link" :class="{ active: $route.path === '/' }" to="/">
                    <img src="@/assets/images/flag.svg" alt="Flag" />
                    Запуски
                </RouterLink>

                <RouterLink class="link" :class="{ active: $route.path === '/about' }" to="/about">
                    <img src="@/assets/images/profile.svg" alt="profile" />
                    Обо мне
                </RouterLink>
            </nav>
        </div>
    </aside>
</template>
