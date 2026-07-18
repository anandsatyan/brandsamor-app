import { SeoHead } from './SeoHead';
import { ScentStudioExperience } from '../scentStudio/app/ScentStudioExperience';

/** Conversational AI Scent Studio app — linked from the Create a Scent landing page. */
export const CreateAScentStudioPage = () => (
  <>
    <SeoHead
      title="Scent Designer Studio | Brandsamor"
      description="Private Brandsamor scent designer workspace for brand fragrance development. Conversations are not publicly indexed."
      url="https://www.brandsamor.com/create-a-scent/studio"
      robots="noindex, follow"
    />
    <ScentStudioExperience />
  </>
);
