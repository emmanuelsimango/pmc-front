import { CartEvent } from './../../models/cart-event';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PredefinedPackage } from 'src/app/models/predefined-package';
import { PackageServiceService } from 'src/app/services/package-service.service';

@Component({
  selector: 'app-pre-products',
  templateUrl: './pre-products.component.html',
  styleUrls: ['./pre-products.component.scss']
})
export class PreProductsComponent implements OnInit {
  @Output() clickedProduct = new EventEmitter<CartEvent>();

  packages:PredefinedPackage[];
  constructor(private packageService:PackageServiceService) {
    this.packageService.getPredefinedDataPackages().subscribe(data=>{
      this.packages = data
    })
  }


  onClickedProduct(product:PredefinedPackage,add:boolean) {
    this.clickedProduct.emit({product:product,action:add});
  }




  ngOnInit(): void {
    const gap = 16;

    const carousel = document.getElementById("carousel"),
      content = document.getElementById("content"),
      next = document.getElementById("next"),
      prev = document.getElementById("prev");

    next.addEventListener("click", (e) => {
      carousel.scrollBy(width + gap, 0);
      if (carousel.scrollWidth !== 0) {
        prev.style.display = "flex";
      }
      if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "none";
      }
    });
    prev.addEventListener("click", (e) => {
      carousel.scrollBy(-(width + gap), 0);
      if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.display = "none";
      }

      const scrollWidth = content.scrollWidth

      if (scrollWidth - (width - gap) <= carousel.scrollLeft + width) {
        next.style.display = "flex";
      }
    });

    let width = carousel.offsetWidth;
    window.addEventListener("resize", (e) => (width = carousel.offsetWidth));
  }

}
