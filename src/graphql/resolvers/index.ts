import merge from 'lodash.merge';
import analyzeResolvers from './analyze.resolvers';
import healthCheckResolvers from './health-check.resolvers';
import scriptResolvers from './script.resolvers';
import stateResolvers from './state.resolvers';
import uploadResolvers from './upload.resolvers';

export default merge(
  healthCheckResolvers,
  uploadResolvers,
  analyzeResolvers,
  stateResolvers,
  scriptResolvers
);
