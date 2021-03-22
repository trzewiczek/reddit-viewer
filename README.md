# Reddit Viewer

## Superquick

 1. Edit `subs.yaml` file to your preferences
 2. Run with `node reddit-viewer [sub]`

You can run it through `torsocks`with

```{bash}
$ torsocks node reddit-viewer [sub]
```

## How it works
It collects the subs from `subs.yaml` file. For each group you can query reddit for the top 10 newest posts. If the group has more than one sub it will query most of them at once resulting in 10 most recent posts from all queried subs.


