# Models reviewed but not shipped

BBB candidates were held out of the product after independent discrimination
checks. Their weights, raw datasets and temporary training dependencies remain
only in ignored local `qa/admet`; none are runtime assets or app dependencies.

The public TDC BBB_Martins–Morgan MLP (Hugging Face revision
`43c57a0613816f90419a34245421c0459ba9c011`) had no numeric performance for the
specific published weights in its model card. It must not be assigned the TDC
leaderboard score of a different model/split. On a conservative B3DB A/B subset
excluding all reference parent topologies and unsupported/duplicate structures
(936 molecules; 691 positive, 245 negative), the weights produced AUROC
0.6738946809 and specificity about 0.3061 at threshold 0.5.

A separately fitted RF baseline selected only on a grouped reference validation
split yielded internal-test AUROC 0.861686, but external AUROC 0.68598 and
specificity about 0.2571. It failed its external release gate and generated no
runtime model. External data were not used to tune the baseline or its threshold.
Neither candidate is offered as a BBB prediction in ChemEase.

Research sources: https://huggingface.co/tdc/BBB_Martins-Morgan,
https://github.com/theochem/B3DB (revision
`75dab1cc607bb7a03f3de5c576cffd223e767844`), and
https://pmc.ncbi.nlm.nih.gov/articles/PMC8556334/.

The released increment is instead the separately sourced published Potts–Guy
skin-permeability model documented in ADMET_SKIN.md. Its literature evidence and
numeric implementation checks must not be confused with the rejected BBB results.
