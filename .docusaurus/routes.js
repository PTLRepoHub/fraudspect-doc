import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'a17'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '571'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '971'),
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
                path: '/id-verification/identity/🇳🇬 nigeria/nin',
                component: ComponentCreator('/id-verification/identity/🇳🇬 nigeria/nin', '5c4'),
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
                path: '/transaction-monitoring/customer/get-customer',
                component: ComponentCreator('/transaction-monitoring/customer/get-customer', '590'),
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
