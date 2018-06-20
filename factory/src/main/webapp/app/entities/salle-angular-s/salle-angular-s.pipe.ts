import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: any, value: any): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter((singleItem) => singleItem[field].toLowerCase().includes(value.toLowerCase()));
    }
}
