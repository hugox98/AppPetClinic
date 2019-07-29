import { TestBed } from '@angular/core/testing';

import { ApiDenunciasService } from './api-denuncias.service';

describe('ApiDenunciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiDenunciasService = TestBed.get(ApiDenunciasService);
    expect(service).toBeTruthy();
  });
});
