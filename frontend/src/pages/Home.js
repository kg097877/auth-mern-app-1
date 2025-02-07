
// Creating the document structure dynamically
const createPageStructure = () => {
    // Set up <html>, <head>, and <body>
    document.documentElement.lang = "en";

    const head = document.createElement("head");
    const metaCharset = document.createElement("meta");
    metaCharset.setAttribute("charset", "UTF-8");

    const metaViewport = document.createElement("meta");
    metaViewport.setAttribute("name", "viewport");
    metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");

    const title = document.createElement("title");
    title.textContent = "PlayPal";

    const scriptGSAP = document.createElement("script");
    scriptGSAP.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js");

    const linkCSS = document.createElement("link");
    linkCSS.setAttribute("rel", "stylesheet");
    linkCSS.setAttribute("href", "homepage.css");

    head.append(metaCharset, metaViewport, title, scriptGSAP, linkCSS);

    const body = document.createElement("body");

    // Create theme toggle button
    const themeToggle = document.createElement("button");
    themeToggle.classList.add("theme-toggle");
    themeToggle.id = "theme-toggle";
    themeToggle.title = "Toggles light & dark";
    themeToggle.setAttribute("aria-label", "auto");
    themeToggle.setAttribute("aria-live", "polite");

    const svg = createThemeToggleSVG();
    themeToggle.appendChild(svg);

    // Navbar
    const navbar = document.createElement("div");
    navbar.classList.add("navbar");

    const logo = document.createElement("img");
    logo.classList.add("logo");
    logo.setAttribute("src", "Logo.jpeg");
    logo.setAttribute("alt", "PlayPal Logo");

    const productName = document.createElement("span");
    productName.classList.add("product-name");
    productName.textContent = "PlayPal";

    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.classList.add("search-box");
    searchBox.id = "searchBox";
    searchBox.placeholder = "Search Playlists...";
    searchBox.addEventListener("input", filterPlaylists);

    const rightIcons = document.createElement("div");
    rightIcons.classList.add("right-icons");

    const darkModeContainer = document.createElement("div");
    darkModeContainer.classList.add("container");

    const darkModeToggle = document.createElement("button");
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.textContent = "🌙";

    darkModeContainer.appendChild(darkModeToggle);
    rightIcons.appendChild(darkModeContainer);

    navbar.append(logo, productName, searchBox, rightIcons);

    // Create Playlist Button
    const createPlaylistBtn = document.createElement("button");
    createPlaylistBtn.id = "createPlaylistBtn";
    createPlaylistBtn.textContent = "Create Playlist";

    // Playlist Form
    const playlistForm = createPlaylistForm();

    // Playlist Container
    const playlistContainer = document.createElement("div");
    playlistContainer.id = "playlistContainer";
    playlistContainer.classList.add("playlist-container");

    // Confirmation Dialog
    const confirmDialog = document.createElement("div");
    confirmDialog.id = "confirmDialog";
    confirmDialog.classList.add("confirm-dialog");

    const confirmDialogContent = document.createElement("p");
    confirmDialogContent.textContent = "Are you sure you want to delete this playlist?";
    const confirmYesBtn = document.createElement("button");
    confirmYesBtn.classList.add("confirm-btn");
    confirmYesBtn.textContent = "Yes";
    confirmYesBtn.setAttribute("onclick", "deleteConfirmed()");
    const confirmNoBtn = document.createElement("button");
    confirmNoBtn.classList.add("cancel-btn");
    confirmNoBtn.textContent = "No";
    confirmNoBtn.setAttribute("onclick", "closeConfirmDialog()");

    confirmDialog.append(confirmDialogContent, confirmYesBtn, confirmNoBtn);

    // Append to Document Body
    body.append(themeToggle, navbar, createPlaylistBtn, playlistForm, playlistContainer, confirmDialog);
    document.documentElement.appendChild(head);
    document.documentElement.appendChild(body);
};

// Helper to create the theme toggle SVG
const createThemeToggleSVG = () => {
    const svg = document.createElement("svg");
    svg.classList.add("sun-and-moon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 24 24");

    const mask = document.createElement("mask");
    mask.classList.add("moon");
    mask.id = "moon-mask";

    const rect = document.createElement("rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "white");

    const circle = document.createElement("circle");
    circle.setAttribute("cx", "24");
    circle.setAttribute("cy", "10");
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "black");

    mask.appendChild(rect);
    mask.appendChild(circle);

    const sunCircle = document.createElement("circle");
    sunCircle.classList.add("sun");
    sunCircle.setAttribute("cx", "12");
    sunCircle.setAttribute("cy", "12");
    sunCircle.setAttribute("r", "6");
    sunCircle.setAttribute("mask", "url(#moon-mask)");
    sunCircle.setAttribute("fill", "currentColor");

    const sunBeamsGroup = document.createElement("g");
    sunBeamsGroup.classList.add("sun-beams");
    sunBeamsGroup.setAttribute("stroke", "currentColor");

    const sunBeams = [
        { x1: "12", y1: "1", x2: "12", y2: "3" },
        { x1: "12", y1: "21", x2: "12", y2: "23" },
        { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" },
        { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" },
        { x1: "1", y1: "12", x2: "3", y2: "12" },
        { x1: "21", y1: "12", x2: "23", y2: "12" },
        { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" },
        { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" },
    ];

    sunBeams.forEach(beam => {
        const line = document.createElement("line");
        line.setAttribute("x1", beam.x1);
        line.setAttribute("y1", beam.y1);
        line.setAttribute("x2", beam.x2);
        line.setAttribute("y2", beam.y2);
        sunBeamsGroup.appendChild(line);
    });

    svg.append(mask, sunCircle, sunBeamsGroup);
    return svg;
};

// Helper to create the playlist form
const createPlaylistForm = () => {
    const playlistForm = document.createElement("div");
    playlistForm.id = "playlistForm";
    playlistForm.classList.add("form-popup");

    const formContent = document.createElement("form");
    formContent.classList.add("form-content");

    const playlistNameLabel = document.createElement("label");
    playlistNameLabel.setAttribute("for", "playlistName");
    playlistNameLabel.textContent = "Playlist Name:";

    const playlistNameInput = document.createElement("input");
    playlistNameInput.type = "text";
    playlistNameInput.id = "playlistName";
    playlistNameInput.required = true;

    const playlistLinkLabel = document.createElement("label");
    playlistLinkLabel.setAttribute("for", "playlistLink");
    playlistLinkLabel.textContent = "Playlist Link:";

    const playlistLinkInput = document.createElement("input");
    playlistLinkInput.type = "url";
    playlistLinkInput.id = "playlistLink";
    playlistLinkInput.required = true;

    const createBtn = document.createElement("button");
    createBtn.type = "submit";
    createBtn.textContent = "Create";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.classList.add("cancelBtn");
    cancelBtn.textContent = "Cancel";

    formContent.append(
        playlistNameLabel,
        playlistNameInput,
        playlistLinkLabel,
        playlistLinkInput,
        createBtn,
        cancelBtn
    );
    playlistForm.appendChild(formContent);
    return playlistForm;
};

// Call to build the page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", createPageStructure);
