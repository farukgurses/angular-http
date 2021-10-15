import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onCreatePost(postData: Post) {
    console.log("sending posst " + postData.title, postData.content)
    this.postsService.createAndStorePost(postData.title, postData.content)
    
  }

  onFetchPosts() {
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching = false
      this.loadedPosts = posts
    })
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = []
    })
  }

  private fetchPosts(){
    this.isFetching = true
    return this.postsService.fetchPosts()
  }
}
