import { Component, ContentChild, ContentChildren, ElementRef, Query, QueryList } from '@angular/core';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  // Examples for ContentChild()
  @ContentChild('paragraph') paragraph!: ElementRef;
  @ContentChild(TestComponent) testRef!: TestComponent;

  @ContentChildren('paragraph') paragraphElements!: QueryList<ElementRef>;
  @ContentChildren(TestComponent) testRefs!: QueryList<TestComponent>;

  stylePara() {
    // this.testRef.userName = 'Changed Name from Child Component';

    this.paragraph.nativeElement.style.color = 'red';

    this.paragraphElements.forEach((para) => {
      para.nativeElement.style.color = 'blue';
    });
    this.testRefs.forEach((test) => {
      console.log(test);
    });
  }
}
