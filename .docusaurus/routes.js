import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'a0f'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '415'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '602'),
            routes: [
              {
                path: '/id-verification',
                component: ComponentCreator('/id-verification', '1f1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/Document',
                component: ComponentCreator('/id-verification/Document', 'f10'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/Document/document-liveness',
                component: ComponentCreator('/id-verification/Document/document-liveness', '40f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/face',
                component: ComponentCreator('/id-verification/face', 'fed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/face/face-detect',
                component: ComponentCreator('/id-verification/face/face-detect', '3f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/face/face-liveness',
                component: ComponentCreator('/id-verification/face/face-liveness', '663'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/face/face-verification',
                component: ComponentCreator('/id-verification/face/face-verification', 'b2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding',
                component: ComponentCreator('/id-verification/full-onboarding', 'f2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding/create-session',
                component: ComponentCreator('/id-verification/full-onboarding/create-session', 'eaa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding/data',
                component: ComponentCreator('/id-verification/full-onboarding/data', '16d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding/enrolment',
                component: ComponentCreator('/id-verification/full-onboarding/enrolment', '19c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding/getting-started',
                component: ComponentCreator('/id-verification/full-onboarding/getting-started', '41d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/full-onboarding/results',
                component: ComponentCreator('/id-verification/full-onboarding/results', 'fa4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity',
                component: ComponentCreator('/id-verification/identity', '34e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇨🇮 côte d\'ivoire/national-id',
                component: ComponentCreator('/id-verification/identity/🇨🇮 côte d\'ivoire/national-id', 'bfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇨🇮 côte d\'ivoire/old-national-id',
                component: ComponentCreator('/id-verification/identity/🇨🇮 côte d\'ivoire/old-national-id', '3a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇨🇮 côte d\'ivoire/residence-card',
                component: ComponentCreator('/id-verification/identity/🇨🇮 côte d\'ivoire/residence-card', 'faa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇬🇭 ghana/passport',
                component: ComponentCreator('/id-verification/identity/🇬🇭 ghana/passport', '0da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇬🇭 ghana/ssnit',
                component: ComponentCreator('/id-verification/identity/🇬🇭 ghana/ssnit', '907'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇬🇭 ghana/voters-card',
                component: ComponentCreator('/id-verification/identity/🇬🇭 ghana/voters-card', 'c85'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/address',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/address', '3a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/alien-id',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/alien-id', '71d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/bank-account',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/bank-account', '17a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/bank-list',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/bank-list', '33d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/credit-history',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/credit-history', '4c9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/drivers-license',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/drivers-license', 'bd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/employment-history',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/employment-history', 'bca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/identity-number',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/identity-number', 'f48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/national-id',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/national-id', 'f82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/passport',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/passport', 'b35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/phone',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/phone', 'aa8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/plate-number',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/plate-number', '358'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/tax-pin',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/tax-pin', '969'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇰🇪 kenya/vehicle-collateral',
                component: ComponentCreator('/id-verification/identity/🇰🇪 kenya/vehicle-collateral', 'eca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/advanced-phone-search',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/advanced-phone-search', '97c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/bank-account',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/bank-account', 'f4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/bank-list',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/bank-list', '87b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/business-verification',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/business-verification', '2ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/bvn',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/bvn', 'be8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/bvn-premium',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/bvn-premium', 'b22'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/drivers-license',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/drivers-license', '9eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/individual-credit-report',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/individual-credit-report', 'ae3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/individual-tax-id',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/individual-tax-id', 'b40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/nin',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/nin', '5c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/phone',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/phone', '4ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/premium-bank-account',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/premium-bank-account', '1a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/premium-bank-list',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/premium-bank-list', '45c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/tin',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/tin', '6bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/vnin',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/vnin', 'fe7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇳🇬 nigeria/voters-card',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/voters-card', '2fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇿🇦 south africa/bank-account',
                component: ComponentCreator('/id-verification/identity/🇿🇦 south africa/bank-account', '93d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇿🇦 south africa/phone',
                component: ComponentCreator('/id-verification/identity/🇿🇦 south africa/phone', '6e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇿🇦 south africa/proof-of-address',
                component: ComponentCreator('/id-verification/identity/🇿🇦 south africa/proof-of-address', '624'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🇿🇦 south africa/said',
                component: ComponentCreator('/id-verification/identity/🇿🇦 south africa/said', 'c30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/id-verification/identity/🌍 global/global-validation',
                component: ComponentCreator('/id-verification/identity/🌍 global/global-validation', '49b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/screening',
                component: ComponentCreator('/screening', '432'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/screening/adverse-media',
                component: ComponentCreator('/screening/adverse-media', '6cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/screening/pep-sanction-screening',
                component: ComponentCreator('/screening/pep-sanction-screening', 'bb5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/screening/screening-result',
                component: ComponentCreator('/screening/screening-result', '52c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring',
                component: ComponentCreator('/transaction-monitoring', 'ceb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/aml-screening',
                component: ComponentCreator('/transaction-monitoring/aml-screening', 'aeb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/customer',
                component: ComponentCreator('/transaction-monitoring/customer', 'f1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/customer/create-update-customer',
                component: ComponentCreator('/transaction-monitoring/customer/create-update-customer', '81d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/customer/customer-connections',
                component: ComponentCreator('/transaction-monitoring/customer/customer-connections', 'dfa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/customer/customer-rules',
                component: ComponentCreator('/transaction-monitoring/customer/customer-rules', '563'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/customer/get-customer',
                component: ComponentCreator('/transaction-monitoring/customer/get-customer', '590'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/report',
                component: ComponentCreator('/transaction-monitoring/report', '393'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/transaction',
                component: ComponentCreator('/transaction-monitoring/transaction', 'c5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/transaction/get-transaction',
                component: ComponentCreator('/transaction-monitoring/transaction/get-transaction', '452'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/transaction/process-transaction',
                component: ComponentCreator('/transaction-monitoring/transaction/process-transaction', 'b08'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/transaction/rescore-transaction',
                component: ComponentCreator('/transaction-monitoring/transaction/rescore-transaction', '758'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/transaction-monitoring/transaction/transaction-statuses',
                component: ComponentCreator('/transaction-monitoring/transaction/transaction-statuses', '1ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'fc9'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
