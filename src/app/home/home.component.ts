import { Component, OnInit, Input } from '@angular/core';
import { WriteoncedbService } from '../writeoncedb.service';
import { Json } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private writeoncedbService: WriteoncedbService;
  @Input() articles : {router:string, introduction: string, title:string,tags: string[]}[] =[]
  data: Json = {};
  searchTerm: string = '';
  filteredArticles : {router:string, introduction: string, title:string, tags: string[]}[] =[];
  paginatedArticles :  {router:string, introduction: string, title:string, tags: string[]}[] =[];
  currentPage: number = 1;
  itemsPerPage: number = 5; 

  constructor() {

    this.writeoncedbService = new WriteoncedbService('writteonce-blog-user');

  }

  items: { text: string; link?: string; isEditing: boolean }[] = [
    { text: 'No Sugar - Gajar ka Halva', link: 'blog/no-sugar-gajar-ka-halva', isEditing: false },
  ];

  ngOnInit(): void {
    this.articles.push(
      {title:'Auto scale gitlab runner using AWS spot instance',
      router:"blog/auto-scale-gitlab-runner-using-aws-spot-instance",
      introduction:"Auto Scaling infrastructure using AWS spot instances is a great option to reduce costs. Unlike dedicated instances, spot instances are requested on demand for a discounted price. Using spot instance is a better option for cases where a increased compute power is required for a short duration of time. One of the case would be to use GPU's for training a machine learning model on a certain dataset for a duration of time. Another example is to use more memory or CPU for building artifacts, performing testing or deploying the application. Gitlab provides an forked docker-machine to spawn the AWS / Azure / GCP  machines on demand. In this article, we will be spawing AWS spot instances for auto scaling CI / CD pipelines.",
      tags: ["gitlab","AWS","Spot Instance","gitlab runner"]
      });
    
    this.filteredArticles = this.articles;
    this.updatePagination();
  }

  filterArticles() {
    if (!this.searchTerm) {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.introduction.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to the first page on new search
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedArticles = this.filteredArticles.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
  }



  addItem(): void {
    this.items.push({ text: '', isEditing: true });
  }

  saveItem(index: number): void {
    const item = this.items[index];
    if (item.text.trim()) {
      item.isEditing = false;
    } else {
      // If the text is empty, remove the item
      this.items.splice(index, 1);
    }

    this.data['id'] = this.writeoncedbService.convertTextToDocId(item.text);
    this.data['title'] = item.text;
    this.data['category'] = "Food";
    this.writeoncedbService.insert(this.data['id'], this.data);


  }

}
