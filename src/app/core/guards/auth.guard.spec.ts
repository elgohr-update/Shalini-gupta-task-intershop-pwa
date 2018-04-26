import { async, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { anything, spy, verify } from 'ts-mockito/lib/ts-mockito';
import { Customer } from '../../models/customer/customer.model';
import { MockComponent } from '../../utils/dev/mock.component';
import { CoreState } from '../store/core.state';
import { coreReducers } from '../store/core.system';
import { LoginUserSuccess } from '../store/user';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  describe('canActivate()', () => {
    let authGuard: AuthGuard;
    let store$: Store<CoreState>;
    let router: Router;

    beforeEach(
      async(() => {
        const loginComponentMock = MockComponent({ selector: 'ish-login', template: 'Login Component' });

        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule.withRoutes([{ path: 'login', component: loginComponentMock }]),
            StoreModule.forRoot(coreReducers),
          ],
          providers: [AuthGuard],
          declarations: [loginComponentMock],
        }).compileComponents();
      })
    );

    beforeEach(() => {
      authGuard = TestBed.get(AuthGuard);
      store$ = TestBed.get(Store);
      const realRouter = TestBed.get(Router);
      router = spy(realRouter);
    });

    it('should return true when user is authorized', () => {
      store$.dispatch(new LoginUserSuccess({} as Customer));

      authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(authorized => {
        expect(authorized).toBeTruthy();
        verify(router.navigate(anything(), anything())).never();
      });
    });

    it('should return false when called as unauthorized', () => {
      authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(authorized => {
        expect(authorized).toBeFalsy();
        verify(router.navigate(anything(), anything())).once();
      });
    });
  });
});
