import { PredefinedPackage } from './../../../models/predefined-package';
import { PackageServiceService } from './../../../services/package-service.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {

  packages:PredefinedPackage[]

  constructor(private packageService:PackageServiceService) {

    this.packageService.getPredefinedDataPackages().subscribe(data=>{
      this.packages = data
    })
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
