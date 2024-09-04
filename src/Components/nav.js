export default {
  template: `
    
    <!-- ========== HEADER ========== -->
    <header
        class="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
        <nav
            class="relative max-w-[85rem] w-full mx-auto flex items-center justify-between gap-3 py-2 px-4 sm:px-6 lg:px-8">
    
            <a class="flex items-center font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
                href="#">
                <img src="../src/img/sword-1.png" class="w-10" alt="">
                <span> <span class="text-3xl">G</span>uardian <span class="text-3xl">S</span>chool </span>
            </a>
    
            <div class="md:order-3 flex justify-end items-center gap-x-1">
                <!-- Collapse Button -->
                <button type="button"
                    class="hs-collapse-toggle md:hidden relative p-2 flex items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    id="hs-header-base-collapse" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-header-base"
                    aria-label="Toggle navigation" data-hs-overlay="#hs-header-base">
                    Menu
                    <svg class="shrink-0 size-4 ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
                <!-- End Collapse Button -->
    
                <div class="hidden md:inline-block md:me-2">
                    <div class="w-px h-4 bg-gray-300 dark:bg-neutral-700"></div>
                </div>
    
                <!-- Darkness Toggle -->
                <button id="dark-toggle"
                    class=" dark-toggle cursor-pointer z-10 transition-all duration-1000 ease-in-out w-6 h-6">
                    <div class="relative w-full h-full">
                        <div id="sun"
                            class="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100 visible">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        </div>
                        <div id="moon"
                            class="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 invisible text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        </div>
                    </div>
                </button>
                <!-- End Darkness Toggle -->
            </div>
    
            <!-- Collapse -->
            <div id="hs-header-base"
                class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-e basis-full grow md:order-2 md:static md:block md:h-auto md:max-w-none md:w-auto md:border-e-transparent md:transition-none md:translate-x-0 md:z-40 md:basis-auto dark:bg-neutral-800 dark:border-e-gray-700 md:dark:border-e-transparent hidden "
                role="dialog" tabindex="-1" aria-label="Sidebar" data-hs-overlay-close-on-resize>
                <div
                    class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <div class="py-2 md:py-0 px-2 md:px-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                        <!-- Offcanvas Header -->
                        <div class="md:hidden p-2 flex justify-between items-center">
                            <h3 id="hs-header-base-label" class="flex items-center font-bold text-gray-800 dark:text-white">
                                <img src="../src/img/sword-1.png" class="w-10" alt="">
                                <span> <span class="text-2xl">G</span>uardian <span class="text-2xl">S</span>chool </span>
                            </h3>
                            <button type="button"
                                class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close" data-hs-overlay="#hs-header-base">
                                <span class="sr-only">Close</span>
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <!-- End Offcanvas Header -->
                        <div class="grow">
                            <div class="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
    
                                <a class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                    href="dashboard.html">
                                    <svg class="shrink-0 size-4 me-3 md:me-2 block md:hidden"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                        <path
                                            d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                    Home
                                </a>
    
                                <a class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                    href="students.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="shrink-0 size-4 me-3 md:me-2 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                    Students
                                </a>
    
                                <a class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                    href="courses.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
                                    fill="currentColor" stroke="currentColor" class="shrink-0 size-4 me-3 md:me-2 block md:hidden" viewBox="0 0 100 100" id="books">
                                        <path
                                            d="M18 31h3v6H7c-.79 0-1.51.47-1.83 1.19-.32.73-.18 1.57.35 2.16 5 5.5 5 13.8 0 19.3-.53.59-.67 1.43-.35 2.16C5.49 62.53 6.21 63 7 63h75c7.17 0 13-5.83 13-13s-5.83-13-13-13H41v-6h52c.79 0 1.51-.47 1.83-1.19.32-.73.18-1.57-.35-2.16-5-5.5-5-13.8 0-19.3.53-.59.67-1.43.35-2.16A2.008 2.008 0 0 0 93 5H18C10.83 5 5 10.83 5 18s5.83 13 13 13zm64 10c4.96 0 9 4.04 9 9s-4.04 9-9 9H10.91a18.274 18.274 0 0 0 0-18H21v8a2 2 0 0 0 3.2 1.6l6.8-5.1 6.8 5.1c.35.26.78.4 1.2.4a2 2 0 0 0 2-2v-8h41zm-57 4V21h12v24l-4.8-3.6c-.36-.27-.78-.4-1.2-.4s-.84.13-1.2.4L25 45zM18 9h71.09a18.274 18.274 0 0 0 0 18H41v-8c0-1.1-.9-2-2-2H23c-1.1 0-2 .9-2 2v8h-3c-4.96 0-9-4.04-9-9s4.04-9 9-9zm76.83 61.19A2.008 2.008 0 0 0 93 69H18c-7.17 0-13 5.83-13 13s5.83 13 13 13h75c.79 0 1.51-.47 1.83-1.19.32-.73.18-1.57-.35-2.16-5-5.5-5-13.8 0-19.3.53-.59.67-1.43.35-2.16zM89.09 91H18c-4.96 0-9-4.04-9-9s4.04-9 9-9h71.09a18.274 18.274 0 0 0 0 18z">
                                        </path>
                                    </svg>
                                    Courses
                                </a>
    
                                <a class="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                    href="enrollment.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="shrink-0 size-4 me-3 md:me-2 block md:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                    </svg>
                                    Enrollment
                                </a>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Collapse -->
        </nav>
    </header>
    <!-- ========== END HEADER ========== -->
    
    `,
};
