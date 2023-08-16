import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  @ViewChild('filePicker') filePicker!: ElementRef;
  postCreateForm!: FormGroup;
  postData!: Post;
  btnText = "Save";
  postId!: string;
  isLoading: boolean = false;
  imagePreview!: string;
  constructor(private _postService: PostService, private _activatedRouterService: ActivatedRoute, private _route: Router) {
    this.createPostForm();
    this._activatedRouterService.params.subscribe((paramResponse) => {
      if (paramResponse["id"]) {
        this.postId = paramResponse["id"];
        this._postService.getPostById(paramResponse["id"]).subscribe((postResponse: any) => {
          this.postCreateForm.patchValue({
            post_title: postResponse.title,
            post_description: postResponse.description,
            image: postResponse.image
          });
          this.imagePreview = postResponse.image;
          this.btnText = "Edit Data";
        })
      }
    })
  }
  createPostForm() {
    this.postCreateForm = new FormGroup({
      post_title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      post_description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
      image: new FormControl(null, Validators.required)
    })
  }
  addPost() {
    if (this.btnText === "Save") {
      if ((!this.postCreateForm.value.post_title || !this.postCreateForm.value.post_description) || (!this.postCreateForm.valid))
        return;
      this.isLoading = true;
      this._postService.addPosts(this.postCreateForm.value.post_title, this.postCreateForm.value.post_description, this.postCreateForm.value.image).subscribe((postResult) => {
        if(postResult){
          this.isLoading = false;
          this._postService.postAddTrigger.next(true);
          this.postCreateForm.reset();
          this.deleteImage();
        }
      })
    } else {
      this._postService.editPost(this.postId, this.postCreateForm.value.post_title, this.postCreateForm.value.post_description, this.postCreateForm.value.image).subscribe((updatePostResponse) => {
        if(updatePostResponse){
        this.isLoading = false;
        this._postService.postAddTrigger.next(true);
        this.postCreateForm.reset();
        this.deleteImage();
        this.btnText = "Save";
        this._route.navigateByUrl('/posts');
        }
      });
    }

  }
  uploadFile(event: any): boolean | void {
    const file = event?.target?.files[0];
    if (file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg') {
      this.postCreateForm.patchValue({ image: file });
      this.postCreateForm.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  resetForm() {
    this.createPostForm();
    if (this.btnText === "Edit Data") {
      this.btnText = "Save";
      this._route.navigateByUrl('/');
    }
  }
  deleteImage() {
    this.imagePreview = '';
    if (this.filePicker)
      this.filePicker.nativeElement.value = '';
  }
}
