import { t, Trans } from '@lingui/macro';
import * as React from 'react';
import { List, ListItem, Spinner } from '@patternfly/react-core';
import { DeleteModal } from 'src/components/delete-modal/delete-modal';
import { UserType } from 'src/api';

interface IProps {
  count?: number;
  cancelAction: () => void;
  deleteAction: () => void;
  name: string;
  users?: UserType[];
}

export class DeleteGroupModal extends React.Component<IProps> {
  render() {
    const { cancelAction, count, deleteAction, name, users } = this.props;

    return (
      <DeleteModal
        cancelAction={cancelAction}
        deleteAction={deleteAction}
        title={t`Delete group?`}
      >
        <Trans>
          <b>{name}</b> will be permanently deleted.
        </Trans>
        <p>&nbsp;</p>
        <div>
          {users && count > 10 && (
            <p>
              <Trans>Deleting this group will affect {count} users.</Trans>
            </p>
          )}
          {users && count > 0 && count <= 10 && (
            <>
              <p>
                <Trans>
                  These users will lose access to the group content:
                </Trans>
              </p>
              <List>
                {users.map((u) => (
                  <ListItem key={u.username}>
                    <b>{u.username}</b>
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {users && !count && <p>{t`No users will be affected.`}</p>}
          {!users && (
            <p>
              <Trans>
                Checking for affected users... <Spinner size='sm' />
              </Trans>
            </p>
          )}
        </div>
      </DeleteModal>
    );
  }
}
