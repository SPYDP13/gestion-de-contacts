import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupManagePage } from './group-manage.page';

describe('GroupManagePage', () => {
  let component: GroupManagePage;
  let fixture: ComponentFixture<GroupManagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
