export interface ArticlePage {
    title: string,
    router:string
    systitle: string;
    introduction :string;
    tags : string [];
  }

export  interface ArticleContent {
    title: string;
    systitle: string;
    content: Content;
    author: string;
    publishedOn: number;
    references: Reference[];
}

interface Content {
    img: Image;
    sections: Section[];
    codes: Code[];
    images: Image[];
    tags : string []
}

interface Image {
    path: string;
    caption: string;
    sectionIndex: number;
    paragraphIndex: number;
}

interface Section {
    heading: string;
    paragraphs: string[];
}

interface Code {
    language: string;
    snippet: string;
    title: string;
    sectionIndex: number;
    paragraphIndex: number;
}

interface Reference {
    title: string;
    url: string;
    dateAccessed: number;
}


export class Articles implements ArticleContent {
    title: string;
    systitle: string;
    content: Content;
    author: string;
    publishedOn: number;
    references: Reference[];
    constructor(data: ArticleContent) {
        this.title = data.title;
        this.systitle = data.systitle;
        this.content = data.content;
        this.author = data.author;
        this.publishedOn = data.publishedOn;
        this.references = data.references;
    }
    toArticlePageModel(): ArticlePage {

        const introduction = this.content.sections[0].paragraphs[0];
        const tags = this.content.tags;
       
       
        return {
            title: this.title,
            router : `blog/${this.systitle}`,
            introduction,
            systitle: this.systitle,
            tags,
          
        };
    }
    
}


