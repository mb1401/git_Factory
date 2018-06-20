import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
})
@Pipe({
    name: 'capFilter',
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
@Injectable()
export class CapFilterPipe implements PipeTransform {

    // Transform is the new "return function(value, args)" in Angular 1.x
    transform(value, args?) {
        // ES6 array destructuring
        const [minAge] = args;
        return value.filter((salle) => {
            return salle.capacite >= +minAge;
        });
    }
}
