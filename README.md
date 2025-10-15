# Alvaldi Docs

## Initial Setup

This repository uses git submodules to include the `nt-docs` repository which provides the docs theme and scripts. After cloning, you need to initialize the submodules:

```bash
# When cloning for the first time
git clone --recurse-submodules https://github.com/your-org/alvaldi-docs.git

# Or if you already cloned:
git submodule update --init --recursive
```

## Local preview

Using docker / podman to build and serve is fairly straight forward:

```
docker build --tag alvaldi-docs -f Containerfile . && docker run -p 80:80 -it --name alvaldi-docs --rm alvaldi-docs
```

If you wish to properly date a content item for the future, such as when drafting
a blog post, you can change the `Containerfile` or your local `hugo` command to
include `-D --buildDrafts` and `-F --buildFuture` so
`hugo --buildDrafts --buildFuture --logLevel info` instead of `hugo --logLevel info`.
