import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  postCreateForm!: FormGroup;
  postData!: Post;
  constructor(private _postService: PostService) {
    this.createPostForm();
  }
  createPostForm() {
    this.postCreateForm = new FormGroup({
      post_title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      post_description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)])
    })
  }
  addPost() {
    if (!this.postCreateForm.value.post_title || !this.postCreateForm.value.post_description)
      return;
    // this.postData = this.postCreateForm.value;
    this._postService.addPosts(this.postCreateForm.value.post_title, this.postCreateForm.value.post_description);
    this._postService.postAddTrigger.next(true);
    this.postCreateForm.reset();
  }
}
