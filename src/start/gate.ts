/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 9/2/2020
 * Time: 9:05 PM
 */
import { Gate as abc } from '@tngraphql/guard/dist/src';
import { UserModel } from '../app/UserModel';
import { PostModel } from '../app/Features/Post/PostModel';

const Gate: any = abc;

Gate.define('role', async (user: any) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('role\*') ) {
        return true;
    }

    return false;
});
Gate.define('role-delete', async (user: any) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('role-delete') ) {
        return true;
    }

    return false;
});
Gate.define('role-update', async (user: any) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('role-update') ) {
        return true;
    }

    return false;
});
Gate.define('role-create', (user: any) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( user.can('role-create') ) {
        return true;
    }

    return false;
});


Gate.define('post-update', async (user: UserModel, post: PostModel) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('post-update') ) {
        return true;
    }

    if ( ! post ) {
        return false;
    }

    if ( post.authorId === user.id ) {
        return true
    }

    return false
});
Gate.define('post-create', async (user: any, args) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('post-create') ) {
        return true;
    }

    return false;
});
Gate.define('post-delete', async (user: any, post) => {
    if ( user.isOwner() ) {
        return true;
    }

    if ( await user.can('post-delete') ) {
        return true;
    }

    if ( ! post ) {
        return false;
    }

    if ( post.authorId === user.id ) {
        return true
    }

    return false;
});
