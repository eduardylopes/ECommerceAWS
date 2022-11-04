#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppStack } from '../lib/productsApp-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: '531107396150',
  region: 'sa-east-1',
};

const tags = {
  cost: 'ECommerce',
  team: 'SiecolaCode',
};

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  tags,
  env,
});

const eCommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env,
});

eCommerceApiStack.addDependency(productsAppStack);
