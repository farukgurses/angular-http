import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable()
export class PostsService {
  error = new Subject<string>()
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post(
        "https://ng-test-f4130-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      }, error => {
          this.error.next(error)
      });
  }

  fetchPosts() {
    return this.http
      .get("https://ng-test-f4130-default-rtdb.firebaseio.com/posts.json")
      .pipe(
        // map(responseData =>{
        map((responseData) => {
          const postsArray = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError( errorRes => {
              return  throwError(errorRes)
        })
      );
  }

  deletePosts(){
      return this.http.delete("https://ng-test-f4130-default-rtdb.firebaseio.com/posts.json", )
  }
}
