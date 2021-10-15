import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false
  error = null
  private errorSub: Subscription

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
   this.errorSub = this.postsService.error.subscribe(errorMsg => {
      this.error = errorMsg
    })

    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching = false
      this.loadedPosts = posts
    }, error =>{
        this.error = error.message
        console.log(error)
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

  onHandleError(){
    this.error = null
  }

  private fetchPosts(){
    this.isFetching = true
    return this.postsService.fetchPosts()
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe()
  }
}
