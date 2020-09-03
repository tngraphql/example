/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 9/1/2020
 * Time: 2:52 PM
 */
import { Repository } from '@tngraphql/illuminate/dist/Contracts/Config/Repository';
import { Facade } from '@tngraphql/illuminate/dist/Support/Facade';

export const Config: Repository = Facade.create<Repository>('config');