/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import { BaseRepository } from './BaseRepository';
import { Service } from '@tngraphql/illuminate';
import PermissionModel from '../../app/Models/PermissionModel';

@Service()
export class PermissionRepository extends BaseRepository<PermissionModel> {
    public model(): typeof PermissionModel {
        return PermissionModel;
    }
}
