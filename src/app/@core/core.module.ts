import { getDeepFromObject } from '@nebular/auth/helpers';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthProvider, NbEmailPassAuthProvider } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbDummyAuthProvider,
        config: {
          delay: 3000,
          login: {
            rememberMe: true,
          },
        },
      },
    },
  }).providers,
  AnalyticsService,
];

// const NB_CORE_PROVIDERS = [
//   ...DataModule.forRoot().providers,
//   ...NbAuthModule.forRoot({
//     providers: {
//       email: {
//         service: NbEmailPassAuthProvider,
//         config: {
//           baseEndpoint: '',
//           login: {
//             alwaysFail: false,
//             rememberMe: true,
//             endpoint: '/api/auth/login',
//             method: 'post',
//             redirect: {
//               success: '/',
//               failure: null,
//             },
//             defaultErrors: ['Login/Email combination is not correct, please try again.'],
//             defaultMessages: ['You have been successfully logged in.'],
//           },
//           register: {
//             alwaysFail: false,
//             rememberMe: true,
//             endpoint: '/api/auth/register',
//             method: 'post',
//             redirect: {
//               success: '/',
//               failure: null,
//             },
//             defaultErrors: ['Something went wrong, please try again.'],
//             defaultMessages: ['You have been successfully registered.'],
//           },
//           logout: {
//             alwaysFail: false,
//             endpoint: '/api/auth/logout',
//             method: 'delete',
//             redirect: {
//               success: '/',
//               failure: null,
//             },
//             defaultErrors: ['Something went wrong, please try again.'],
//             defaultMessages: ['You have been successfully logged out.'],
//           },
//           requestPass: {
//             endpoint: '/api/auth/request-pass',
//             method: 'post',
//             redirect: {
//               success: '/',
//               failure: null,
//             },
//             defaultErrors: ['Something went wrong, please try again.'],
//             defaultMessages: ['Reset password instructions have been sent to your email.'],
//           },
//           resetPass: {
//             endpoint: '/api/auth/reset-pass',
//             method: 'put',
//             redirect: {
//               success: '/',
//               failure: null,
//             },
//             resetPasswordTokenKey: 'reset_password_token',
//             defaultErrors: ['Something went wrong, please try again.'],
//             defaultMessages: ['Your password has been successfully changed.'],
//           },
//           token: {
//             key: 'data.token',
//             getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
//               this.getConfigValue('token.key')),
//           },
//           errors: {
//             key: 'data.errors',
//             getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
//               this.getConfigValue('errors.key'),
//               this.getConfigValue(`${module}.defaultErrors`)),
//           },
//           messages: {
//             key: 'data.messages',
//             getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
//               this.getConfigValue('messages.key'),
//               this.getConfigValue(`${module}.defaultMessages`)),
//           },
//         },
//       },
//     },
//   }).providers,
//   AnalyticsService,
// ];


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
