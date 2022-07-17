import { Action } from "@ngrx/store";
import { Receipe } from "../receipe.model";

export const RECEIPE_SET_RECEIPES='RECEIPE_SET_RECEIPES';
export const RECEIPE_FETCH_RECEIPES='RECEIPE_FETCH_RECEIPES';
export const RECEIPE_ADD_RECEIPE='RECEIPE_ADD_RECEIPE';
export const RECEIPE_UPDATE_RECEIPE='RECEIPS_UPDATE_RECEIPE';
export const RECEIPE_DELETE_RECEIPE='RECEIPE_DELETE_RECEIPE';
export const RECEIPE_SAVE_RECEIPES='RECEIPE_SAVE_RECEIPES';

export class ReceipeSetReceipes implements Action{
    readonly type=RECEIPE_SET_RECEIPES;
    constructor(public payload: Receipe[]){};
}

export class ReceipeFetchReceipes implements Action{
    readonly type=RECEIPE_FETCH_RECEIPES;
}

export class ReceipeAddReceipe implements Action{
    readonly type=RECEIPE_ADD_RECEIPE;
    constructor(public payload:Receipe){}
}

export class ReceipeUpdateReceipe implements Action{
    readonly type=RECEIPE_UPDATE_RECEIPE;
    constructor(public payload:{index:number,receipe:Receipe}){}
}

export class ReceipeDeleteReceipe implements Action{
    readonly type=RECEIPE_DELETE_RECEIPE;
    constructor(public payload:number){}
}

export class ReceipeSaveReceipes implements Action{
    readonly type=RECEIPE_SAVE_RECEIPES;
}

export type ReceipeActions = ReceipeSetReceipes|
    ReceipeFetchReceipes|
    ReceipeAddReceipe|
    ReceipeUpdateReceipe|
    ReceipeDeleteReceipe|
    ReceipeSaveReceipes;