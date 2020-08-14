/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {Criteria} from "../Criteria/Criteria";
import {ModelQueryBuilderContract} from "@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {LucidRow, ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {IReadRepository} from "../Contracts/IReadRepository";
import {IWriteRepository} from "../Contracts/IWriteRepository";
import {tap} from "../../lib/utils";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";

export abstract class BaseRepository<T extends LucidRow = LucidRow, M extends LucidModel = LucidModel> implements IReadRepository, IWriteRepository{
    abstract model(): LucidModel;

    constructor() {
        this.query();
    }

    public _query: ModelQueryBuilderContract<M, T>;

    protected _skipCriteria: boolean = false;

    protected _criteria: any[] = [];

    /**
     * Prevents from overwriting same criteria in chain usage
     */
    protected preventCriteriaOverwriting: boolean = true;

    public async transaction(callback): Promise<any> {
        return Database.transaction(callback);
    }

    public newQuery(): ModelQueryBuilderContract<M, T> {
        return this.model().query() as any;
    }

    public query() {
        this._query = this.newQuery();
        return this;
    }

    public limit(limit: number = 20): this {
        this._query.limit(limit);
        return this;
    }

    public offset(offset: number = 0): this {
        this._query.offset(offset);
        return this;
    }

    public orderBy(column: string, direction?: 'asc' | 'desc') {
        if (column.toLowerCase().startsWith('select')) {
            this._query.orderByRaw(`(${column}) ${direction}`);
        } else {
            this._query.orderBy(column, direction);
        }
        return this;
    }

    public async all(): Promise<T[]> {
        this.applyCriteria();
        return (await this._query);
    }

    public async first(): Promise<T> {
        this.applyCriteria();
        return (await this._query.first());
    }

    public async firstBy(id: any, attribute: string = 'id', columns: string[] = ['*']) {
        this._query.where(attribute,  id)
            .select(columns)
        this.applyCriteria();
        return (await this._query.first());
    }

    public async paginate(perPage: number = 20, page: number = 1) {
        this.applyCriteria();
        const result = await this._query.paginate(page, perPage);

        let from = (result.perPage * (result.currentPage - 1)) + 1;

        let to = result.perPage * result.currentPage;
        if (to > result.total) to = result.total;
        if (!result.total) {
            from = to = null;
        }

        return {
            from,
            to,
            perPage: result.perPage,
            currentPage: result.currentPage,
            total: result.total,
            data: result.all()
        };
    }

    public async create(data: Partial<ModelAttributes<T>>): Promise<T> {
        return (await this.model().create(data)) as T;
    }

    public async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        if (id instanceof BaseModel) {
            return id.delete();
        }

        const query = this.newQuery();

        const instance = await query.where(attribute, id).first();

        if (!instance) {
            return 0;
        }

        return instance.delete();
    }

    public async destroy(ids: any, attribute: string = this.getKeyName()): Promise<boolean | any[]> {
        ids = Array.isArray(ids) ? ids : arguments;

        const result = [];

        const query = this.model().query();
        const data = await query.where(this.getKeyName(), 'in', ids);

        await Promise.all(data.map(async (x) => {
            const deleted = this.delete(x);
            if (deleted) {
                result.push(x[attribute]);
            }
            return deleted;
        }));

        return result.length === 0 ? false : result;
    }

    protected getKeyName(): string {
        return this.model().primaryKey;
    }

    public async update(data: Partial<ModelAttributes<T>>, value: any, attribute: string = this.getKeyName()): Promise<T> {
        const query = this.newQuery();

        return tap(await query.where(attribute, '=', value).firstOrFail(), async (value: LucidRow) => {
            value.merge(data);
            return value.save();
        });
    }

    public resetScope(): this {
        this.skipCriteria(false);
        return this;
    }

    public skipCriteria(status: boolean = true): this {
        this._skipCriteria = status;
        return this;
    }

    public getCriteria(): Criteria[] {
        return this._criteria;
    }

    public applyCriteria(): this {
        if (this._skipCriteria === true) {
            return this;
        }

        for (let criteria of this.getCriteria()) {
            if (criteria instanceof Criteria) {
                criteria.apply(this._query, this);
            }
        }

        return this;
    }

    public pushCriteria(criteria: Criteria): this {
        if (this.preventCriteriaOverwriting) {
            // Find existing criteria
            const key = this._criteria.findIndex(value => {
                return value.constructor === criteria.constructor;
            });

            // Remove old criteria
            if (key !== -1) {
                this._criteria.splice(key, 1);
            }
        }

        this._criteria.push(criteria);
        return this;
    }
}