import { TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.inject(UsuarioComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
