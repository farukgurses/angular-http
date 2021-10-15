import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post(
        'https://ng-test-f4130-default-rtdb.firebaseio.com/posts.json', 
        postData
    ).subscribe( responseData => {
      console.log(responseData)
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://ng-test-f4130-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        // map(responseData =>{
        map(responseData =>{
         const postsArray = []
         for(let key in responseData){
           if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key})
           }
         }
         return postsArray
      }))
      .subscribe( response=>{
        this.loadedPosts = response
        // console.log(response)
      })
  }
}
