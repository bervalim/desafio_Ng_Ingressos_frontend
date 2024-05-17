import { TestBed } from '@angular/core/testing';

import { PostRequest } from './post.request';

describe('PostService', () => {
  let service: PostRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
