import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts = [];
  comments = [];
  posts_url = 'https://vd6oenx9w6.execute-api.eu-west-1.amazonaws.com/prod/api/getPosts';
  comments_url_base = 'https://vd6oenx9w6.execute-api.eu-west-1.amazonaws.com/prod/api/getComments?post_id=';
  comments_loading = false;
  selected_post_id = false;

  commentsDataSource;

  // table definition
  displayedColumns = [
    'fb_created_time', 
    'fb_user_fullname',
    'comment',
    'subcomment',
    'fb_reactions_summary_type',
    'fb_reactions_total_count',
    'is_hidden_detected'
  ];

  constructor(private http: Http) {
    this.getPosts().subscribe(data => {
      this.posts = data.posts;
    }, error => console.log(error));
  }

  // handlers

  public applyCommentFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.commentsDataSource.filter = filterValue;
  }

  public exportFilteredResults() {
    console.log(this.commentsDataSource.flatten());
  }

  public handleShowPostComments(post_id) {
    this.comments_loading = true;
    this.selected_post_id = post_id;
    this.getPostComments(post_id)
      .subscribe(data => {
        this.comments = data.comments;

        // flatten comments and subcomments
        const commentsFlattened = [];
        for (const comment of this.comments) {

          // add comment
          comment.comment = comment.fb_message;
          commentsFlattened.push(comment);

          // add subcomments
          for (const subcomment of comment.Comments) {
            // console.log(subcomment);
            subcomment.subcomment = subcomment.fb_message;
            commentsFlattened.push(subcomment);
          }

        }
        this.commentsDataSource = new MatTableDataSource(commentsFlattened);
        this.comments_loading = false;
      }, error => console.log(error));
  }


  public getPosts(): Observable<any> {
    return this.http.get(this.posts_url)
      .map((res:any) => res.json())
      // .catch((error:any) => console.log(error));
  }


  public getPostComments(post_id): Observable<any>{
    return this.http.get(this.comments_url_base + post_id)
      .map((res:any) => res.json())
  }

}


export interface Element {
  date: string;
}