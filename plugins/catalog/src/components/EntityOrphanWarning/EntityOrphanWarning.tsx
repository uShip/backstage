/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEntity } from '@backstage/plugin-catalog-react';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DeleteEntityDialog } from './DeleteEntityDialog';

/**
 * Displays a warning alert if the entity is marked as orphan with the ability to delete said entity.
 */
export const EntityOrphanWarning = () => {
  const navigate = useNavigate();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const { entity } = useEntity();
  if (entity.metadata?.annotations?.['backstage.io/orphan'] !== 'true') {
    return null;
  }

  const cleanUpAfterRemoval = async () => {
    setConfirmationDialogOpen(false);
    navigate('/');
  };

  return (
    <>
      <Alert severity="warning" onClick={() => setConfirmationDialogOpen(true)}>
        This entity is not referenced by any location and is therefore not
        receiving updates. Click here to delete.
      </Alert>
      <DeleteEntityDialog
        open={confirmationDialogOpen}
        entity={entity!}
        onConfirm={cleanUpAfterRemoval}
        onClose={() => setConfirmationDialogOpen(false)}
      />
    </>
  );
};