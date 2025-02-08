
export interface Cover {
    id: number;
    url: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    cover: Cover;
    genres: Genre[];
    hypes: number;
    name: string;
    
}
export interface Franchise {
    id: number;
    name: string;
}

export interface Platform {
    id: number;
    name: string;
}

export interface Screenshot {
    id: number;
    url: string;
}

export interface Video {
    id: number;
    video_id: string;
}

export interface Website {
    id: number;
    url: string;
}

export interface InvolvedCompany {
    id: number;
    name: string;
}

export interface GameDetails extends Game {
    first_release_date: number;
    franchise: Franchise;
    platforms: Platform[];
    screenshots: Screenshot[];
    videos: Video[];
    websites: Website[];
    involved_companies: InvolvedCompany[];
    summary: string;
}