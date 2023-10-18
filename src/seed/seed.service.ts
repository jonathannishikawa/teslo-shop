import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed.date';

@Injectable()
export class SeedService{

  constructor(
    private readonly productsService: ProductsService
  ) {}

  async runSeed() {

    await this.insertNewProduct();

    return 'SEED EXECUTED';
  }

  private async insertNewProduct() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insterPromises = []
    products.forEach(product => {
      insterPromises.push(this.productsService.create(product));
    });

    await Promise.all(insterPromises);

    return true;
  }
}
