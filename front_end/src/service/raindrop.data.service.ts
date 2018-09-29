import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ApiService } from '../service/api.service';

@Injectable()
export class RaindropDataService {
    constructor(private apiService: ApiService) {
    }

    public getRaindropData(fileName: string) {
        return d3.csv("../../assets/resources/"+fileName);
    }
}