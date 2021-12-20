import merge from 'lodash.merge';
import healthCheckResolvers from './health-check.resolvers';
import uploadResolvers from './upload.resolvers';

export default merge(healthCheckResolvers, uploadResolvers);
