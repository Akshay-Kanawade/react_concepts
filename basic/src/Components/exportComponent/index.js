import React from 'react';
import DefaultExport from './DefaultExport';
import {NamedExport} from './NamedExport';

function ComponentExport() {
  return (
    <div>
      <b>Create Component with default and named export/import </b> 
    <DefaultExport/>
    <NamedExport/>
    </div>
  );
}

export default ComponentExport;
