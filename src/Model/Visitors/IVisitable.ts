import { IVisitor } from "./IVisitor";

/**
 * Interface that defines a method for accepting visitors.
 */
export interface IVisitable {
    accept(visitor: IVisitor): void;
}