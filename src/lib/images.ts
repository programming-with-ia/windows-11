export const GH_PublicTree =
    "https://raw.githubusercontent.com/programming-with-ia/windows-11/4b3d2fa29f917071d889bfbaca54356716d9dbbc/public";

export const DesktopIcons = {
    // Chrome: `${GH_PublicTree}/icons/chrome.png`,
    Chrome: "https://www.google.com/chrome/static/images/favicons/favicon-96x96.png",
    Gmail: "https://workspace.google.com/lp/static/images/logo-gmail.png",
    PC: `${GH_PublicTree}/icons/pc.png`,
    ColorGradient: `${GH_PublicTree}/icons/colorgradient.png`,
    ExitFullScreen: `${GH_PublicTree}/icons/exit-full-screen.png`,
    Explorer: `${GH_PublicTree}/icons/explorer.png`,
    Folder: `${GH_PublicTree}/icons/folder.png`,
    FullScreen: `${GH_PublicTree}/icons/full-screen.png`,
    GithubIcon: `${GH_PublicTree}/icons/github-icon.png`,
    Imageres185: `${GH_PublicTree}/icons/imageres_185.png`,
    Network: `${GH_PublicTree}/icons/network.png`,
    Shortcut: `${GH_PublicTree}/icons/shortcut.png`,
    // Vscode: `${GH_PublicTree}/icons/vscode.png`,
    Vscode: "https://code.visualstudio.com/assets/apple-touch-icon.png",
    Projects: `${GH_PublicTree}/icons/projects.png`,
    Calculator: `${GH_PublicTree}/icons/calculator.png`,
    MotoX3M: `${GH_PublicTree}/icons/motoX3.jpg`,
    SpeedMaster: `${GH_PublicTree}/icons/speed-master.jpg`,
    Notepad: "/icons/notepad.png",
    Settings: "/icons/settings.png",
    X: "/icons/x-twitter.svg",
    msStore: "https://apps.microsoft.com/assets/icons/logo-256x256.png",
    Spotify: "https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico",
} as const satisfies Record<string, string>;

export const ExplorerIcons = {
    WindowsDrive: `${GH_PublicTree}/icons/windows-drive.png`,
    Drive: `${GH_PublicTree}/icons/drive.png`,
    FolderDesktop: `${GH_PublicTree}/icons/folder-desktop.png`,
    FolderDocuments: `${GH_PublicTree}/icons/folder-documents.png`,
    FolderDownloads: `${GH_PublicTree}/icons/folder-downloads.png`,
    FolderMusic: `${GH_PublicTree}/icons/folder-music.png`,
    FolderPictures: `${GH_PublicTree}/icons/folder-pictures.png`,
    FolderVideos: `${GH_PublicTree}/icons/folder-videos.png`,
    UserFolder: `${GH_PublicTree}/icons/user-folder.png`,
    SimpleFile: "/icons/file.png",
} as const satisfies Record<string, string>;
